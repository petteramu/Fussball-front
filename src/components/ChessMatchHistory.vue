<template>
	<div
		id="matchHistory"
		class="matchHistory">
		<ol>
			<li
				v-if="pagination"
				@click="previousPage()"
				class="navigateListButton"
				:class="{ disabled: offset == 0 }">Previous</li>
			<li
				class="match"
				v-for="(match, index) in page"
				:key="index"
				@click="openOptions(match)">
				<span class="new-match-history">
					<div class="whiteContainer">
						<span v-bind:class="getPlayerColor(match, 'white')">
							<div>{{ (match.white.key) }}
								<span v-if="match.white.gain !== undefined">
									(<span v-if="match.white.gain >= 0">+</span>{{ Math.round(match.white.gain) }})
								</span>
								<span v-if="match.white.loss !== undefined">
									(<span v-if="match.white.loss >= 0">+</span>{{ Math.round(match.white.loss) }})
								</span>
								<span v-if="match.white.change !== undefined">
									(<span v-if="match.white.change >= 0">+</span>{{ Math.round(match.white.change) }})
								</span>
							</div>
						</span>
					</div>
					<div class="blackContainer">
						<span v-bind:class="getPlayerColor(match, 'black')">
							<div>{{ (match.black.key) }}
								<span v-if="match.black.gain !== undefined">
									(<span v-if="match.black.gain >= 0">+</span>{{ Math.round(match.black.gain) }})
								</span>
								<span v-if="match.black.loss !== undefined">
									(<span v-if="match.black.loss >= 0">+</span>{{ Math.round(match.black.loss) }})
								</span>
								<span v-if="match.black.change !== undefined">
									(<span v-if="match.black.change >= 0">+</span>{{ Math.round(match.black.change) }})
								</span>
							</div>
						</span>
					</div>
					<div class="result">{{ getResult(match) }}</div>
					<div class="timestamp">{{ formatDate(match.timestamp) }}</div>
				</span>
			</li>
			<li
				v-if="pagination"
				@click="nextPage()"
				class="navigateListButton"
				:class="{ disabled: offset >= totalMatches - 5 }">Next</li>
		</ol>
	</div>
</template>

<script>
import _ from 'lodash'
import RemoveChessGamePopup from './RemoveChessGamePopup'
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'chess-match-history',
	props: ['matches', 'pagination'],
	data: function() {
		return {
			offset: 0
		}
	},
	computed: {
		page (state) {
			if(_.isArray(this.matches)) {
				if(this.pagination === true)
					return _.clone(this.matches).slice(this.offset, this.offset + 5)
				else
					return this.matches
			}
		},
		totalMatches (state) {
			return this.matches.length
		}
	},
	methods: {
		getPlayerColor (match, color) {
			if(match.winner === 'remis')
				return ''
			if(color === 'white' && match.winner !== undefined)
				return match.winner === 'white' ? 'winner' : 'loser'
			if(color === 'black' && match.winner !== undefined)
				return match.winner === 'black' ? 'winner' : 'loser'
			return ''
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
		getResult (match) {
			if(match.winner === 'white')
				return '1 - 0'

			if(match.winner === 'black')
				return '0 - 1'

			return '0.5 - 0.5'
		},
		transformGain (result, winner) {
			const change = Math.round(result)
			if(change >= 0)
				return "+" + Math.abs(change)
			else
				return "-" + Math.abs(change)
		},
		openOptions (match) {
			this.setRemoveMatchObject(match)
			this.setActivePopup({
				component: RemoveChessGamePopup
			})
		},
		previousPage () {
			this.offset = Math.max(this.offset - 5, 0)
		},
		nextPage () {
			this.offset = Math.min(this.offset + 5, this.totalMatches - 5)
		},
		...mapMutations(['setRemoveMatchObject', 'setActivePopup'])
	}
}
</script>

<style lang="scss">

#matchHistory {
	ol {
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 100%;
		border: 1px solid $midGray;
	}

	.navigateListButton {
		height: 38px;
		padding: 5px;
		line-height: 30px;
		text-align: center;
		background: $midGray;
		font-weight: bold;
		&:hover {
			cursor: pointer;
			background: #4E8098;
			color: white;
		}

		&.disabled {
			&:hover {
				cursor: pointer;
				background: $midGray;
				color: black;
			}
		}
	}
}

.match {
	list-style: none;
	margin: 0;
	padding: 5px;
	background: $lightGray;
	line-height: 30px;
	padding: 3px 30px 3px 30px;
	height: 80px;
	position: relative;

	&:nth-child(odd) {
		background: $midGray;
	}

	.whiteContainer, .blackContainer {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		line-height: 15px;
		text-transform: capitalize;
		max-width: 30%;
	}

	.whiteContainer {
		width: 50%;
	}

	.blackContainer {
		padding-left: 5px;
		right: 30px;
	}

	.winner {
		color: green;
	}

	.loser {
		color: #8C271E;
	}

	.timestamp {
		text-align: center;
		position: absolute;
		left: inherit;
		width: 100%;
		bottom: 0;
		font-size: 10px;
		margin-left: -30px;
	}

	.result {
		font-family: 'Arial Black', Arial, Helvetica, sans-serif;
		font-size: 25px;
		position: absolute;
		top: 50%;
		left: inherit;
		margin-left: -30px;
		text-align: center;
		transform: translateY(-50%);
		width: 100%;
	}
}

@media screen
	and (max-device-width: 1024px)
	and (-webkit-min-device-pixel-ratio: 1) {

	.match {
		.blackContainer {
			right: 15px;
		}
		.whiteContainer {

		}
	}
}
</style>
