<template>
	<div
		id="RoundBasedMatchHistory">
		<h2>Matches</h2>
		<h3>Round {{ this.activeRound + 1 }}/{{ rounds.length }}</h3>
		<button
			:disabled="activeRound === 0"
			@click="previous">
			Previous</button>
		<button
			:disabled="!rounds || activeRound === rounds.length - 1"
			style="float:right"
			@click="next">
			Next</button>
		<ScheduledMatchHistory
			:data="roundData" />
	</div>
</template>

<script>
import ScheduledMatchHistory from './ScheduledMatchHistory'
export default {
	name: 'RoundBasedMatchHistory',
	data () {
		return {
			activeRound: 0
		}
	},
	props: ['rounds'],
	methods: {
		next () {
			if(this.activeRound < this.rounds.length - 1)
				this.activeRound++
		},
		previous () {
			if(this.activeRound > 0)
				this.activeRound--
		}
	},
	computed: {
		roundData () {
			if(this.rounds && this.rounds.length > 0)
				return this.rounds[this.activeRound]
		}
	},
	components: {
		ScheduledMatchHistory
	}
}
</script>

<style scoped>
#RoundBasedMatchHistory {
	list-style-type: none;
	padding: 0;
	margin: 7px;
	border: 1px solid #e9e9e9;
	vertical-align: top;
	width: 100%;
}

button {
	margin: 0px 15px 10px 15px;
	width: 100px;
}

button[disabled="disabled"] {
	background: grey;
}

@media screen 
	and (min-device-width: 1000px)
	and (-webkit-min-device-pixel-ratio: 1) {
	#RoundBasedMatchHistory {
		display: inline-block;
		width: 50%;
		float: right;
	}
}

h2, h3 {
	margin: 0;
	padding: 10px 10px 10px 15px;
	display: inline-block;
	width: 50%;
}

h3 {
	top: 5px;
	right: 5px;
	text-align: right;
}
</style>