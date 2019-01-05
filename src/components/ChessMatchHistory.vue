<template>
	<div id="matchHistory" class="matchHistory">
		<h2>Latest matches</h2>
		<ol>
			<li v-if="offset > 0" @click="offset--" class="navigateListButton">Previous</li>
			<li v-for="match in matches" @click="openOptions(match)">
				<span class="new-match-history">
					<div class="whiteContainer">
						<span v-bind:class="match.winner === 'white' ? 'winner' : 'loser'">
							<div>{{ (match.white.key) }} ({{ transformGain(match.white.gain, match.winner === 'white') }})</div>
						</span>
					</div>
					<div class="blackContainer">
						<span v-bind:class="match.winner === 'black' ? 'winner' : 'loser'">
							<div>{{ (match.black.key) }} ({{ transformGain(match.black.loss, match.winner === 'black') }})</div>
						</span>
					</div>
					<div class="result">{{ getResult(match) }}</div>
					<div class="timestamp">{{ formatDate(match.timestamp) }}</div>
				</span>
			</li>
			<li v-if="totalMatches > offset + 5" @click="offset++" class="navigateListButton">Next</li>
		</ol>
	</div>
</template>

<script>
import _ from 'lodash'
import RemoveChessGamePopup from './RemoveChessGamePopup'
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'chess-match-history',
	data: function() {
		return {
			offset: 0
		}
	},
	computed: {
		matches (state) {
			let matches = this.$store.state.matches
			if(_.isArray(matches))
				return _.clone(matches).reverse().slice(this.offset, this.offset + 5)
		},
		totalMatches (state) {
			let matches = this.$store.state.matches
			return matches.length
		}
	},
	methods: {
		formatDate (timestamp) {
			let monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			let date = new Date(timestamp)
			let hh = date.getHours()
			let mm = date.getMinutes()
			if(hh < 10) hh = "0" + hh;
			if(mm < 10) mm = "0" + mm;
			return hh + ':' + mm + ' - ' + date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
		},
		getLatestMatches () {
			if (_.isArray(this.matches))
				return this.matches.reverse().slice(0, 10)
			else {
				let array = []
				for (let prop in this.matches) {
					if(this.matches.hasOwnProperty(prop)) {
						array[parseInt(prop)] = this.matches[parseInt(prop)]
					}
				}
				return array.reverse().slice(0, 5)
			}
		},
		getResult (match) {
			if(match.winner === 'white')
				return '1 - 0'

			if(match.winner === 'black')
				return '0 - 1'

			return '0.5 - 0.5'
		},
		transformGain (result, winner) {
			const change = Math.round(result)
			if(winner)
				return "+" + Math.abs(change)
			else
				return "-" + Math.abs(change)
		},
		openOptions (match) {
			this.setRemoveMatchObject(match)
			this.setActivePopup(RemoveChessGamePopup)
		},
		...mapMutations(['setRemoveMatchObject', 'setActivePopup'])
	}
}
</script>

<style>

#matchHistory ol {
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
	border: 1px solid #e9e9e9;
}

#matchHistory li, .match {
	list-style: none;
	margin: 0;
	padding: 5px;
	background: #f5f5f5;
	line-height: 30px;
	padding: 3px 10px 3px 10px;
	height: 80px;
	position: relative;
}

#matchHistory li:nth-child(even), .match:nth-child(even) {
	background: #e9e9e9;
}

.winner {
	color: green;
}

.loser {
	color: #8C271E;
}

.whiteContainer, .blackContainer {
	text-transform: capitalize;
}

.whiteContainer {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 50%;
}

.winnerResult {
	text-align: center;
	color: black;
	display: inline-block;
	font-size: 24px;
	font-weight: bold;
	height: 60px;
	line-height: 60px;
	position: relative;
	top: -11px;
}

.new-match-history .winners {
	display: inline-block;
}

.blackContainer {
	padding-left: 5px;
	height: 100%;
	line-height: 90px;
	right: 10px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}

.losers div {
	text-align: right;
}

.new-match-history .losers {
	display: inline-block;
}

.loserResult {
	display: inline-block;
	line-height: 60px;
	height: 60px;
	position: relative;
	top: -11px;
	color: black;
	font-weight: bold;
	text-align: center;
	font-size: 24px;
}

.timestamp {
	text-align: center;
	position: absolute;
	left: inherit;
	width: 100%;
	bottom: 0;
	font-size: 12px
}

.result {
  font-family: 'Arial Black', Arial, Helvetica, sans-serif;
  font-size: 25px;
  position: absolute;
  top: 50%;
  left: inherit;
  margin: auto;
  text-align: center;
  transform: translateY(-50%);
  width: 100%;
}

#matchHistory .navigateListButton {
	height: 30px;
	padding: 5px;
	line-height: 20px;
	text-align: center;
}

#matchHistory .navigateListButton:hover {
	background: #4E8098;
	color: white;
}
</style>
