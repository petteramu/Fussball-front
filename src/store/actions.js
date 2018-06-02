import firebase from '../libs/Model'

export default {
	addPlayer ({ commit, state }, name) {
		if(!name) return
		let existing = Object.values(state.players)
		existing = _.filter(existing, player => player.name === name)
		if(existing.length) return

		firebase.addPlayer(name)
	},

	addMatch ({ commit, state }, match) {
		firebase.submitGame(match)
	},

	removeMatch ({ commit, state}, match) {
		firebase.removeMatch(match.key)
	}
}