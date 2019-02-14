<template>
	<div id="matchHistory" class="matchHistory">
		<h2>Latest matches</h2>
		<ol>
			<li v-if="offset > 0" @click="offset--" class="navigateListButton">Previous</li>
			<li v-for="match in matches" @click="openOptions(match)">
				<span class="new-match-history">
					<div class="winnerContainer">
						<div class="winners">
							<div v-for="winner in match.winners">{{ winner.key }} ({{ transformGain(winner.gain) }})</div>
						</div>
					</div>
					<div class="loserContainer">
						<span class="losers">
							<div v-for="loser in match.losers">{{ loser.key }} ({{ transformLoss(loser.loss) }})</div>
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
import RemoveGamePopup from './RemoveGamePopup'
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'match-history',
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
		capitalize (string) {
			return string && string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
		},
		formatDelta (string) {
			let int = parseInt(string)
			if(int >= 0)
				return "+" + int
			else
				return int
		},
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
			let diff = parseInt(match.difference)
			return "5 - " + (5 - diff)
		},
		getLoserScore (match) {
			let diff = parseInt(match.difference)
			return 5 - diff
		},
		transformGain (result) {
			return "+" + Math.round(result)
		},
		transformLoss (result) {
			return "-" + Math.round(result)
		},
		openOptions (match) {
			this.setRemoveMatchObject(match)
			this.setActivePopup(RemoveGamePopup)
		},
		...mapMutations(['setRemoveMatchObject', 'setActivePopup'])
	}
}
</script>

<style scoped>

ol {
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
	border: 1px solid #e9e9e9;
}

li {
	list-style: none;
	margin: 0;
	padding: 5px;
	background: #f5f5f5;
	line-height: 30px;
	padding: 3px 10px 3px 10px;
	height: 80px;
	position: relative;
}

li:nth-child(even) {
	background: #e9e9e9;
}

.loserContainer, .winnerContainer {
}

.winnerContainer, .old-match-history .winners{
	color: green;
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

.loserContainer, .old-match-history .losers {
	color: #8C271E;
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

.navigateListButton {
	height: 20px;
	padding: 5px;
	line-height: 20px;
	text-align: center;
}

.navigateListButton:hover {
	background: #4E8098;
	color: white;
}
</style>
