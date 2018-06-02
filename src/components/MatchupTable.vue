<template>
	<div class="matchupTable">
		<h2>{{ data.title }}</h2>
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td></td>
				<td v-for="matchup in data">
					{{ capitalize(matchup.name) }}
				</td>
			</tr>
			<tr v-for="matchup in data">
				<td>{{ capitalize(matchup.name) }}</td>
				<td v-bind:style="getStyle(getPercentage(opponent))" v-for="opponent in matchup.dataset">{{ getPercentage(opponent) }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'matchupTable',
	props: ['data'],
	methods: {
		getStyle (percentage) {
			percentage = parseInt(percentage);
			if (isNaN(percentage)) {
				return "background: #efefef"
			}
			else if (percentage > 50) {
				//let green = 35 + Math.floor(5.1 * (percentage - 35))
				let reduction = 1 - percentage / 150
				return "background: rgb(" + Math.floor(255 * reduction) + ", 255, " + Math.floor(255 * reduction) + ")"
			}
			else if (percentage < 50) {
				let reduction = 1 - (50 - percentage) / 75
				return "background: rgb(255, " + Math.floor(255 * reduction) + ", " + Math.floor(255 * reduction) + ")"
			}
			else {
				return "background: #5C9EFF"
			}
		},
		capitalize (string) {
			return string && string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
		},
		getPercentage (opponentData) {
			if(opponentData.wins == 0 && opponentData.losses == 0)
				return '-'
			else if(opponentData.losses == 0)
				return "100%"
			else
				return Math.floor((opponentData.wins * 100) / (opponentData.wins + opponentData.losses)) + "%"
		}
	}
}
</script>

<style scoped>
tr {
	height: 50px;
	margin: 0;
	padding: 0;
}
td  {
	width: 50px;
	text-align: center;
	margin: 0;
	padding: 3px;
	border-right: 1px solid #e7e7e7;
	border-bottom: 1px solid #e7e7e7;
}
td:first-child {
	border-left: 1px solid #e7e7e7;
}
tr:first-child > td {
	border-top: 1px solid #e7e7e7;
}
</style>
