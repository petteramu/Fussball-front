export default {
	updateMatches (state, payload) {
		state.matches = payload
	},
	updatePlayers (state, payload) {
		state.players = payload
	},
	// Accepts a state and payload object
	// payload should be of structure:
	// { data: <Any>, component: <Component> }
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