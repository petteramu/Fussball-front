
function createTeammateData (matches) {
	return []
	let players  = getPlayerArray(matches)
	let matchupTable = []

	for (let index in players) {
		let player = players[index]
		matchupTable[index] = {
			name: player,
			dataset: []
		}
		for (let index2 in players) {
			let player2 = players[index2]
			matchupTable[index].dataset[index2] = {
				opponentName: player2,
				wins: 0,
				losses: 0
			}
		}
	}

	for (let match of matches) {
		addTeammateResultToTable(match.winners[0].key, match.winners[1].key, matchupTable, players, true)
		addTeammateResultToTable(match.losers[1].key, match.losers[0].key, matchupTable, players, false)
	}
	return matchupTable
}
function createOpponentData (matches) {
	return []
	let players  = getPlayerArray(matches)
	let matchupTable = []

	for (let index in players) {
		let player = players[index]
		matchupTable[index] = {
			name: player,
			dataset: []
		}
		for (let index2 in players) {
			let player2 = players[index2]
			matchupTable[index].dataset[index2] = {
				opponentName: player2,
				wins: 0,
				losses: 0
			}
		}
	}

	for (let match of matches) {
		addResultToTable(match.winners[0].key, match.losers[0].key, matchupTable, players)
		addResultToTable(match.winners[1].key, match.losers[0].key, matchupTable, players)
		addResultToTable(match.winners[0].key, match.losers[1].key, matchupTable, players)
		addResultToTable(match.winners[1].key, match.losers[1].key, matchupTable, players)
	}
	return matchupTable
}
function getPlayerArray (matches) {
	let players = []
	players = _.map(matches, function(match) {
		return _.map(match.winners.concat(match.losers), function(player) {
			return player.key
		})
	})
	players = _.uniq(_.flatten(players))
	return players
}
function addResultToTable (winner, loser, table, players) {
	let winnerIndex = players.indexOf(winner)
	let loserIndex = players.indexOf(loser)
	table[winnerIndex].dataset[loserIndex].wins++
	table[loserIndex].dataset[winnerIndex].losses++
}
function addTeammateResultToTable (player, partner, table, players, win) {
	let playerIndex = players.indexOf(player)
	let partnerIndex = players.indexOf(partner)
	if (win) {
		table[playerIndex].dataset[partnerIndex].wins++
		table[partnerIndex].dataset[playerIndex].wins++
	}
	else {
		table[playerIndex].dataset[partnerIndex].losses++
		table[partnerIndex].dataset[playerIndex].losses++
	}
}

export { createOpponentData, createTeammateData }