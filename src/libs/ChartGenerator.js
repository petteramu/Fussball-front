function getWeeklyChartData (matches) {
	return {}
	let weeks = _.map(matches, function(match) {
		return getWeekNumber(new Date(match.timestamp));
	})
	weeks = _.uniq(weeks)
	weeks = weeks.slice(-10)
	let minWeek = weeks[0];
	let maxWeek = weeks[weeks.length - 1]

	let players = {}
	for(let match of matches) {
		let wn = getWeekNumber(new Date(match.timestamp))
		if(wn >= minWeek && wn <= maxWeek) {
			let wnIndex = weeks.indexOf(wn)
			createChartObject(match.winners[0].key, match.winners[0].preRanking + match.winners[0].gain, match, players, wnIndex, weeks.length)
			createChartObject(match.losers[0].key, match.losers[0].preRanking - match.losers[0].loss, match, players, wnIndex, weeks.length)
		}
	}

	// Fill values
	for(let key in players) {
		let player = players[key]
		for(let index = 0; index < player.values.length; index++) {
			let val = player.values[index]
			if (val == undefined && index > 0) {
				player.values[index] = player.values[index - 1]
			}
		}
	}

	let values = []
	for(let player in players) {
		values.push(players[player])
	}

	return {
		labels: weeks,
		values: values,
		xLabel: 'Week'
	}
}
function getDailyChartData (matches) {
	return {}
	let dates = _.map(matches, function(match) {
		return getDateStamp(match.timestamp)
	})
	dates = _.uniq(dates)
	dates = dates.slice(-10)
	let minDay = dates[0];
	let maxDay = dates[dates.length - 1]
	let players = {}
	for(let match of matches) {
		let dateStamp = getDateStamp(match.timestamp)
		if(dateStamp >= minDay && dateStamp <= maxDay) {
			let dsIndex = dates.indexOf(dateStamp)
			createChartObject(match.winners[0].key, match.winners[0].preRanking + match.winners[0].gain, match, players, dsIndex, dates.length)
			createChartObject(match.losers[0].key, match.losers[0].preRanking - match.losers[0].loss, match, players, dsIndex, dates.length)
		}
	}

	let values = []
	for(let player in players) {
		fillInEmpty(players[player].values)
		values.push(players[player])
	}

	// Transform into date
	dates = _.map(dates, function(dateStamp) {
		return new Date(dateStamp).getDate()
	})

	return {
		labels: dates,
		values: values,
		xLabel: 'Date'
	}
}
function getDateStamp (stamp) {
	let date = new Date(stamp)
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)
	date.setMilliseconds(0)
	return date.getTime()
}
function fillInEmpty (array) {
	let index = 0
	while(index < array.length) {
		if (index > 0 && array[index] == undefined) {
			array[index] = array[index - 1]
		}
		index++
	}
	return array
}
function createChartObject (player, elo, match, playersObject, valueIndex, max) {
	if(playersObject[player] == undefined) {
		playersObject[player] = {
			name: player,
			values: new Array(max)
		}
	}
	playersObject[player].values[valueIndex] = elo
}
/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber (d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo
}
function getDateString (d) {
	let date = doubleNum(d.getUTCDate())
	let month = doubleNum(d.getUTCMonth())
	let year = d.getFullYear()
	return date + ':' + month + ':' + year
}
function doubleNum (num) {
	if (num < 10)
		num = '0' + num
	return num
}

export { getWeeklyChartData, getDailyChartData }