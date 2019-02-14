import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import firebasePlugin from '../libs/FirebasePlugin'
import roundRobinModule from './modules/RoundRobin'
import scheduledHistoryModule from './modules/ScheduledMatchHistory'

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
	modules: {
		roundRobin: roundRobinModule,
		scheduledMatches: scheduledHistoryModule
	},
	plugins: [firebasePlugin]
})