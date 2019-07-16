import Vue from 'vue'
import _ from 'lodash'
export const setPlayers = (state, payload) => {
	let rankings = _.map(payload, (player) => {
		return { name: player, wins: 0 }
	})
	Vue.set(state, 'rankings', rankings)
}

export const calculatePoints = (state, payload) => {
	if(!payload) return

	let blackPoints = 0
	let whitePoints = 0
	const winner = payload.winner
	if(winner === 'remis') {
		blackPoints = 0.5
		whitePoints = 0.5
	}
	else if(winner === 'white')
		whitePoints = 1
	else
		blackPoints = 1

	const whitePlayer = _.filter(state.rankings, (object) => object.name === payload.white.key)[0]
	const blackPlayer = _.filter(state.rankings, (object) => object.name === payload.black.key)[0]

	if(!whitePlayer || !blackPlayer)
		return console.log('Missing players in calculatePoints')

	whitePlayer.wins += whitePoints
	blackPlayer.wins += blackPoints
}

export const updateMatch = (state, payload) => {
	if(!payload) return

	const originalMatch = payload.originalMatch
	const newMatch = payload.newMatch
	
	if(!state.matches)
		return console.log('Matches does not exist in updateMatch')

	let found = false
	state.matches.forEach((round) => {
		const index = round.indexOf(originalMatch)
		if(index === -1)
			return

		found = true
		Vue.set(round, index, newMatch)
	})
	
	if(!found)
		console.log('Match does not exist in updateMatch')
}

function selectRandomMatchFrom(matches) {
	if(matches === undefined) return
	let randomIndex = Math.floor(Math.random() * matches.length)
	return matches[randomIndex]
}

function getMatchesWithoutPlayersIn(matches, players, both) {
	if(both == undefined) both = true
	let validMatches = _.filter(matches, (match) => {
		if(both)
			return players.indexOf(match.white.key) === -1
				&& players.indexOf(match.black.key) === -1
		else
			return players.indexOf(match.white.key) === -1
				|| players.indexOf(match.black.key) === -1
	})
	return validMatches
}

export const _calculateMatches = (state, payload) => {
	if(!state.rankings) return

	let matches = []
	let matchups = []
	for(let player of state.rankings) {
		for(let opponent of state.rankings) {
			let matchupExists = (matchups.indexOf(player.name + opponent.name) > -1 || matchups.indexOf(opponent.name + player.name) > -1)
			if(player === opponent || matchupExists) continue

			matchups.push(player.name + opponent.name)
			matches.push({
				white: { key: player.name },
				black: { key: opponent.name },
				winner: undefined
			})
		}
	}

	// Sort the matches so a player does not play two in one round
	let rounds = []
	let playersInRound = []
	for(let i = 0; matches.length > 0; i++) {
		let round = []
		playersInRound[i] = []

		while(round.length < Math.floor(state.rankings.length / 2)) {
			// Prioritize matches of players that didn't play in the previous round
			// Don't do priority if on the first round or if there is an even number of players
			if(i > 0 && state.rankings.length % 2 === 1) {
				var priMatches = getMatchesWithoutPlayersIn(matches, playersInRound[i - 1], false)
				priMatches = getMatchesWithoutPlayersIn(priMatches, playersInRound[i])
			}

			let validMatches = getMatchesWithoutPlayersIn(matches, playersInRound[i])

			if((!priMatches || priMatches.length === 0) && validMatches.length === 0) break

			let match = (priMatches && priMatches.length > 0) ? 
				selectRandomMatchFrom(priMatches) :
				selectRandomMatchFrom(validMatches)

			let matchesIndex = matches.indexOf(match)
			matches.splice(matchesIndex, 1)

			round.push(match)
			playersInRound[i].push(match.white.key)
			playersInRound[i].push(match.black.key)
		}

		rounds.push(round)
		console.log('Round ' + i)
		round.forEach((match) => {
			console.log(match.white.key + ' - ' + match.black.key)
		})
	}

	Vue.set(state, 'matches', rounds)
}

export const calculateMatches = (state, payload) => {
	const DUMMY = { name: 'BYE' }
	let players = _.cloneDeep(state.rankings)

	if(players.length % 2)
		players.unshift(DUMMY)

	let rounds = []
	for(let i = 0; i < players.length - 1; i++) rounds.push([])

	for(let i = 0; i < rounds.length; i++) {
		let round = rounds[i]
		for(let y = 0; y < players.length / 2; y++) {
			let player = players[y]
			let opponent = players[players.length - 1 - y]

			if(player === DUMMY || opponent === DUMMY) continue

			if(player.gamesAsWhite == undefined) player.gamesAsWhite = 0
			if(opponent.gamesAsWhite == undefined) opponent.gamesAsWhite = 0

			let white = { key: player.name }
			let black = { key: opponent.name }

			round.push({
				white,
				black,
				winner: undefined
			})
		}
		// Rotate the players to change up the matches
		(players[0] === DUMMY) ? players.splice(1, 0, players.pop()) : players.splice(0, 0, players.pop())
	}

	rounds = _.shuffle(rounds)

	if(payload.double) {
		// Duplicate matches but reverse black and white if
		// this is a double round robin
		let reverse = []
		for(let i = 0; i < rounds.length; i++) {
			let reverseRound = []
			for(let y = 0; y < rounds[i].length; y++) {
				let match = rounds[i][y]
				reverseRound.push({
					white: match.black,
					black: match.white,
					winner: undefined
				})
			}
			reverse.push(reverseRound)
		}
		rounds = rounds.concat(reverse)
	}
	let whiteBlack = {}
	for(let i = 0; i < rounds.length; i++) {
		for(let y = 0; y < rounds[i].length; y++) {
			let match = rounds[i][y]
			if(whiteBlack[match.white.key] == undefined)
				whiteBlack[match.white.key] = { white: 0, black: 0 }
			whiteBlack[match.white.key].white++

			if(whiteBlack[match.black.key] == undefined)
				whiteBlack[match.black.key] = { white: 0, black: 0 }
			whiteBlack[match.black.key].black++
		}
	}
	console.log(whiteBlack)
	Vue.set(state, 'matches', rounds)
}