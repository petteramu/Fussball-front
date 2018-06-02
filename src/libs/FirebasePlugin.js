import firebase from './Model'

export default function firebasePlugin (store) {
	createFirebaseListeners(store, firebase)
}

function createFirebaseListeners(store, firebase) {
	// Listen to changes in firebase
	firebase.on(firebase.getPlayersURL(), function(players) {
		store.commit('updatePlayers', players)
	}.bind(this))

	firebase.on(firebase.getMatchesURL(), function(matches) {
		if (matches == null)
			matches = []

		matches = transformMatches(matches)
		store.commit('updateMatches', matches)
	}.bind(this))
}

function transformMatches (matches) {
	let array = []
	for(let key in matches) {
		let match = matches[key]
		match.key = key // Hold onto key as we might use it for deletion
		array.push(match)
	}
	return array
}