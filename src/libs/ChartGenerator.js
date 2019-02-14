function getWeeklyChartData (matches) {
	let weeks = _.map(matches, function(match) {
		return getYearAndWeekNumber(new Date(match.timestamp));
	})
	weeks = _.uniq(weeks).reverse()
	weeks = weeks.slice(0, 10)
	let minWeek = weeks[0];
	let maxWeek = weeks[weeks.length - 1]

	let validMatches = _.filter(matches, (match) => {
		// Ignore matches with outdate structure
		if(!match.white) return false

		let wn = getYearAndWeekNumber(new Date(match.timestamp))
		return (wn >= minWeek && wn <= maxWeek)
	}).reverse()

	let players = {}
	for(let match of validMatches) {
		let wn = getYearAndWeekNumber(new Date(match.timestamp))
		let wnIndex = weeks.indexOf(wn)

		// Handle both gains and losses for both colors. Must check for gain and loss since remis are unpredictable in who has which.
		if(match.white.gain !== undefined)
			createChartObject(match['white'].key, match['white'].preRanking + match['white'].gain, match, players, wnIndex, weeks.length)
		else
			createChartObject(match['white'].key, match['white'].preRanking - Math.abs(match['white'].loss), match, players, wnIndex, weeks.length)

		if(match.black.gain !== undefined)
			createChartObject(match['black'].key, match['black'].preRanking + match['black'].gain, match, players, wnIndex, weeks.length)
		else
			createChartObject(match['black'].key, match['black'].preRanking - Math.abs(match['black'].loss), match, players, wnIndex, weeks.length)
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
	let dates = _.map(matches, function(match) {
		return getDateStamp(match.timestamp)
	})

	dates = _.uniq(dates).reverse()
	dates = dates.slice(-10)
	let minDay = dates[0];
	let maxDay = dates[dates.length - 1]

	let validMatches = _.filter(matches, (match) => {
		// Ignore matches with outdate structure
		if(!match.white) return false

		let dateStamp = getDateStamp(match.timestamp)
		return (dateStamp >= minDay && dateStamp <= maxDay)
	}).reverse()

	let players = {}
	for(let match of validMatches) {
		let dsIndex = dates.indexOf(getDateStamp(match.timestamp))

		// Handle both gains and losses for both colors. Must check for gain and loss since remis are unpredictable in who has which.
		if(match.white.gain !== undefined)
			createChartObject(match['white'].key, match['white'].preRanking + match['white'].gain, match, players, dsIndex, dates.length)
		else
			createChartObject(match['white'].key, match['white'].preRanking - Math.abs(match['white'].loss), match, players, dsIndex, dates.length)

		if(match.black.gain !== undefined)
			createChartObject(match['black'].key, match['black'].preRanking + match['black'].gain, match, players, dsIndex, dates.length)
		else
			createChartObject(match['black'].key, match['black'].preRanking - Math.abs(match['black'].loss), match, players, dsIndex, dates.length)
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

    return weekNo
}

function getYearAndWeekNumber (d) {
	let weekNo = getWeekNumber(d)
	if(weekNo < 10) weekNo = 0 + '' + weekNo
	return d.getFullYear() + '' + weekNo
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