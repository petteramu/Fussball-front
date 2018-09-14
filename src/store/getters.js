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
	}
}