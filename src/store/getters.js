import _ from 'lodash'
import { getWeeklyChartData, getDailyChartData } from '../libs/ChartGenerator'
import { createOpponentData, createTeammateData } from '../libs/MatchupTableTransformer'

export default {
	rankings: state => {
		if(state.players == undefined)
			return {}

		var rankings = _.map(Object.keys(state.players), key => {
			let mmr, winrate, total
			let player = state.players[key]

			if(player.wins != null && player.losses != null)
				total = player.wins + player.losses

			mmr = Math.floor(state.players[key].ranking)

			if(total > 0)
				winrate = Math.floor((player.wins * 100) / (player.wins + player.losses))

			return {
				name: key,
				mmr: mmr,
				wins: player.wins,
				losses: player.losses,
				remis: player.remis,
				winrate: winrate,
				streak: player.streak,
				icon: player.icon
			}
		})
		rankings = _.values(rankings)
		rankings.sort(function(a, b) {
			if (b.mmr == '-')
				return -1
			if (a.mmr > b.mmr)
				return -1
			else
				return 1
		})
		return rankings
	},

	versusTableData: (state) => {
		return createOpponentData(state.matches)
	},

	teammateTableData: (state) => {
		return createTeammateData(state.matches)
	},

	weeklyChartData: (state) => {
		return getWeeklyChartData(state.matches)
	},

	dailyChartData: (state) => {
		return getDailyChartData(state.matches)
	},

	getUser: (state) => (name) => {
		if(!state.players) return
		return state.players[name]
	},

	getUserMatches: (state) => (name) => {
		return _.filter(state.matches, (match) => {
			return match.white != undefined && (match.white.key === name || match.black.key === name)
		})
	},

	getUserMatchups: (state, getters) => (name) => {
		let matches = getters.getUserMatches(name)
		let opponents = {}

		matches.forEach((match, index) => {
			// Ignore legacy matches. They do not have the "white" property, only winner and loser
			if(!match.white) return
			let opponentColor = (match.white.key === name) ? 'black' : 'white'
			let opponent = match[opponentColor].key

			if(opponents[opponent] == undefined)
				opponents[opponent] = {
					opponent: getters.getUser(opponent),
					matches: [match],
					wins: (match.winner !== opponentColor && match.winner !== 'remis') ? 1 : 0,
					whiteWins: (match.winner !== opponentColor && match.winner !== 'remis' && match.winner === 'white') ? 1 : 0,
					blackWins: (match.winner !== opponentColor && match.winner !== 'remis' && match.winner === 'black') ? 1 : 0,
					
					remis: (match.winner === 'remis') ? 1 : 0,
					whiteRemis: (match.winner === 'remis' && opponentColor === 'black') ? 1 : 0,
					blackRemis: (match.winner === 'remis' && opponentColor === 'white') ? 1 : 0,
					
					losses: (match.winner === opponentColor) ? 1 : 0,
					whiteLosses: (match.winner === opponentColor && match.winner === 'black') ? 1 : 0,
					blackLosses: (match.winner === opponentColor && match.winner === 'white') ? 1 : 0,
				}
			else {
				opponents[opponent].matches.push(match)

				opponents[opponent].wins += (match.winner !== opponentColor && match.winner !== 'remis') ? 1 : 0,
				opponents[opponent].whiteWins += (match.winner !== opponentColor && match.winner !== 'remis' && opponentColor === 'black') ? 1 : 0,
				opponents[opponent].blackWins += (match.winner !== opponentColor && match.winner !== 'remis' && opponentColor === 'white') ? 1 : 0,
				
				opponents[opponent].remis += (match.winner === 'remis') ? 1 : 0,
				opponents[opponent].whiteRemis += (match.winner === 'remis' && opponentColor === 'black') ? 1 : 0,
				opponents[opponent].blackRemis += (match.winner === 'remis' && opponentColor === 'white') ? 1 : 0,
				
				opponents[opponent].losses += (match.winner === opponentColor) ? 1 : 0,
				opponents[opponent].whiteLosses += (match.winner === opponentColor && opponentColor === 'black') ? 1 : 0,
				opponents[opponent].blackLosses += (match.winner === opponentColor && opponentColor === 'white') ? 1 : 0
			}
		})

		return opponents
	}
}