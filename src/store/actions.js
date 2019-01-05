import firebase from '../libs/Model'

export default {
	addPlayer ({ commit, state }, name) {
		if(!name) return
		if(state.players) {
			let existing = Object.values(state.players)
			existing = _.filter(existing, player => player.name === name)
			if(existing.length) return
		}

		firebase.addPlayer(name)
	},

	addMatch ({ commit, state }, { match, callback }) {
		firebase.submitGame(match, callback)
	},

	removeMatch ({ commit, state}, match) {
		firebase.removeMatch(match.key)
	}
}