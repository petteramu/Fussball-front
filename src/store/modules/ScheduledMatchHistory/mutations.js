import Vue from 'vue'
export const setAddGameVisible = (state, payload) => {
	Vue.set(state, 'addGameVisible', payload)
}

export const setAddGameData = (state, payload) => {
	Vue.set(state, 'addGameData', payload)
}

export const resetAddGamePopup = (state, payload) => {
	Vue.set(state, 'addGameVisible', undefined)
	Vue.set(state, 'addGameData', false)
}