import * as firebase from 'firebase'
import FirebaseConfig from '../configs/FirebaseConfig'
import LambdaConfig from '../configs/LambdaConfig'

const DEFAULT_KFACTOR = 32
const PLAYERS_URL = 'players/'
const MATCHES_URL = 'matches/'

export default {
	listeners: {},
	setupFirebase () {
		// Initialize Firebase
		firebase.initializeApp(FirebaseConfig)
		this.database = firebase.database()
	},

	on (url, fn) {
		if(!this.database) this.setupFirebase()

		const ref = this.database.ref(url)
		ref.on('value', function(snap) {
			if(typeof fn === 'function')
				fn(snap.val())
		})
	},

	submitGame (game, callback) {
		const query = {
			action: 'addGame',
			winner: game.winner,
			white: game.white,
			black: game.black,
		}
		this.sendRequest(this.transformToQueryParams(query), callback)
	},

	removeMatch (gameId, callback) {
		const query = {
			action: 'removeGame',
			id: gameId
		}
		this.sendRequest(this.transformToQueryParams(query), callback)
	},

	addPlayer (name, callback) {
		name = name.toLowerCase()
		const query = {
			action: 'addPlayer',
			name: name
		}

		this.sendRequest(this.transformToQueryParams(query, callback))
	},

	transformToQueryParams (obj) {
		let str = ""
		for(let key in obj) {
			if(str != "")
				str += "&"
			str += key + "=" + obj[key]
		}
		return str
	},

	sendRequest (queryParams, callback) {
		const request = new XMLHttpRequest()

		if(typeof callback === 'function')
			request.onreadystatechange = () => {
				if(request.readyState === 4)
					callback(null, JSON.parse(request.response))
			}

		if(typeof callback === 'function')
			request.addEventListener("error", callback)

		request.open('GET', LambdaConfig.url + '?' + queryParams)
		if(LambdaConfig.apiKey)
			request.setRequestHeader('X-Api-Key', LambdaConfig.apiKey)
		request.send()
	},

	_pickArray (array, key) {
		return _.map(array, function(obj) {
			return obj[key]
		})
	},

	getPlayersURL () {
		return PLAYERS_URL
	},

	getMatchesURL () {
		return MATCHES_URL
	}
}