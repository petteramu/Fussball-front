<template>
	<div id="Matchup">
		<div class="halfContainer">
			<span class="opponentName">
				{{ opponent }}
				<span class="opponentRating">#{{ Math.round(matchup.opponent.ranking) }}</span>
			</span>
			<div class="winrateContainer">
				<div class="winrates">
					Total:
					<span>
						<span class="greyed">W</span>
						<b>{{ matchup.wins }}</b>
					</span>
					<span>
						<span class="greyed">R</span>
						<b>{{ matchup.remis }}</b>
					</span>
					<span>
						<span class="greyed">L</span>
						<b>{{ matchup.losses }}</b>
					</span>
				</div>
				<div class="winrates">
					White:
					<span>
						<span class="greyed">W</span>
						<b>{{ matchup.whiteWins }}</b>
					</span>
					<span>
						<span class="greyed">R</span>
						<b>{{ matchup.whiteRemis }}</b>
					</span>
					<span>
						<span class="greyed">L</span>
						<b>{{ matchup.whiteLosses }}</b>
					</span>
				</div>
				<div class="winrates">
					Black:
					<span>
						<span class="greyed">W</span>
						<b>{{ matchup.blackWins }}</b>
					</span>
					<span>
						<span class="greyed">R</span>
						<b>{{ matchup.blackRemis }}</b>
					</span>
					<span>
						<span class="greyed">L</span>
						<b>{{ matchup.blackLosses }}</b>
					</span>
				</div>
			</div>
		</div>

		<div class="halfContainer">
			<div class="lastFive">
				<span
					v-for="match in lastFive()">
					<span
						class="symbol"
						:class="{ white: match.color === 'W', winner: match.winner === true, loser: match.winner === false}">&#9818;</span>
				</span>
			</div>
			<button v-if="!showMatches" @click="showMatches = !showMatches">Show matches</button>
			<button v-if="showMatches" @click="showMatches = !showMatches">Hide matches</button>
		</div>

		<div
			class="matchContainer"
			:class="{ visible: showMatches }">
			<div class="inner">
				<ChessMatchHistory :matches="matchup.matches" />
			</div>
		</div>
	</div>
</template>

<script>
import ChessMatchHistory from '../ChessMatchHistory'
export default {
	name: 'Matchups',
	props: ['matchup', 'opponent'],
	data () {
		return {
			showMatches: false
		}
	},
	methods: {
		lastFive () {
			if(!this.matchup || !this.opponent) return

			return _.map(this.matchup.matches.slice(0, 5).reverse(), (match) => {
				let opponentColor = (match.white.key === this.opponent) ? 'white' : 'black'

				let winner = 'remis'
				if(match.winner === opponentColor) winner = false
				if(match.winner !== opponentColor && match.winner !== 'remis') winner = true

				return {
					winner: winner,
					color: (match.white.key === this.opponent) ? 'B' : 'W',
				}
			}).reverse()
		}
	},
	components: {
		ChessMatchHistory
	}
}
</script>

<style lang="scss" scoped>
#Matchup {
	padding: 10px;
	.opponentName {
		text-transform: capitalize;
		font-weight: bold;
		font-size: 18px;

		.opponentRating {
			font-size: 10px;
			color: grey;
			vertical-align: middle;
		}
	}

	.winrateContainer {
		display: table;
		margin-left: -4px;
		border-spacing: 4px;
		border-collapse:separate;
		.winrates {
			display: table-row;
			padding-top: 5px;
			font-size: 12px;
			.greyed {
				color: grey;
			}

			> span {
				display: table-cell;
				margin-right: 5px;
			}
		}
	}

	.lastFive {
		font-weight: bold;
		text-align: right;
		font-size: 18px;
		.winner {
			position: relative;
			&::before {
				content: '';
				background: green;
				width: 10px;
				height: 10px;
				border-radius: 30px;
				display: inline-block;
				position: absolute;
				bottom: 4px;
				right: 2px;
			}
		}
		.loser {
			position: relative;
			&::before {
				content: '';
				background: #8C271E;
				width: 10px;
				height: 10px;
				border-radius: 30px;
				display: inline-block;
				position: absolute;
				bottom: 4px;
				right: 2px;
			}
		}
		.white {
			color: white;
		}
		.symbol {
			font-size: 32px;
			text-shadow: 0px 0px 5px black;
		}
	}

	.halfContainer {
		vertical-align: top;
		width: 50%;
		display: inline-block;
	}

	.matchContainer {
		overflow: hidden;
		position: relative;
		height: 0px;
		transition: height 0.7s;

		&.visible {
			height: 300px;
			.inner {
				height: 300px;
			}
		}

		.inner {
			height: 0;
			transition: height 0.7s;
			position: absolute;
			right: -17px;
			left: 0;
			top: 0;
			bottom: 0;
			overflow-y: scroll;
			overflow-x: hidden;
		}
	}

	button {
		float: right;
		margin-top: 30px;
	}
}

</style>