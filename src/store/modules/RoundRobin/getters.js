import _ from 'lodash'

export const getRankings = (state, getters, rootState) => {
	if(!state.rankings) return
	return state.rankings.sort((playerA, playerB) => {
		if(playerA.wins > playerB.wins) return -1
		else if(playerA.wins < playerB.wins) return 1
		else return 0
	})
}

export const getMatches = (state) => {
}