<template>
	<div id="RoundRobin">
		<div
			id="RoundRobinOptions"
			v-if="!rankings">
			<h3>Options</h3>
			<div
				id="doubleCheckbox"
				type="checkbox"
				@click="double = !double">
				<span v-if="double">&#10003</span>
				</div>
			<label
				for="doubleCheckbox"><b>Double</b></label>

		</div>

		<PlayerSelector
			v-if="!rankings"
			@confirm="onPlayersSelected" />

		<RoundRobinRankingList
			v-if="rankings" />

		<RoundBasedMatchHistory
			:rounds="matches"
			v-if="matches"/>
	</div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import PlayerSelector from './PlayerSelector'
import RoundRobinRankingList from './RoundRobinRankingList'
import RoundBasedMatchHistory from './RoundBasedMatchHistory'
import PopupWrapper from '../PopupWrapper'

export default {
	name: 'RoundRobin',
	data () {
		return {
			double: false
		}
	},
	computed: {
		...mapState({
			matches: state => state.roundRobin.matches,
			allPlayers: state => state.players
		}),
		...mapGetters({
			rankings: 'roundRobin/getRankings'
		})
	},
	methods: {
		...mapMutations({
			setPlayers: 'roundRobin/setPlayers',
			calculateMatches: 'roundRobin/calculateMatches'
		}),
		onPlayersSelected (data) {
			this.setPlayers(data)
			this.calculateMatches({ double: this.double })
		}
	},
	components: {
		PlayerSelector,
		RoundRobinRankingList,
		RoundBasedMatchHistory,
		PopupWrapper
	}
}
</script>

<style scoped>
#RoundRobin {
	margin-bottom: 25px;
	padding: 7px;
}

#RoundRobin > * {
	padding: 7px; 
}

#RoundRobinOptions {
	border: 1px solid #e9e9e9;
	vertical-align: top;
	padding: 0 15px 15px 15px;
	display: inline-block;
	min-width: 200px;
}

label {
	vertical-align: super;
	margin-left: 5px;
}

#doubleCheckbox {
	width: 20px;
	height: 20px;
	border: 1px solid black;
	display: inline-block;
	font-size: 22px;
	text-align: center;
	line-height: 20px;
	cursor: pointer;
}
</style>