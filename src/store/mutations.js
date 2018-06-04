export default {
	updateMatches (state, payload) {
		state.matches = payload
	},
	updatePlayers (state, payload) {
		state.players = payload
	},
	setActivePopup(state, payload) {
		state.activePopup = payload
	},
	resetActivePopup(state) {
		state.activePopup = undefined
	},
	setRemoveMatchObject(state, payload) {
		state.removeMatchObject = payload
	},
	resetRemoveMatchObject(state) {
		state.removeMatchObject = undefined
	}
}