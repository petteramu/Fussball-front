import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import firebasePlugin from '../libs/FirebasePlugin'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		matches: [],
		players: {},
		activePopup: undefined,
		removeMatchObject: undefined
	},
	getters,
	mutations,
	actions,
	plugins: [firebasePlugin]
})