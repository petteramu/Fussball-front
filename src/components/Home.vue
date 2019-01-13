<template>
	<div id="Home">
		<div id="leftContainer" class="leftContainer">
			<div class="ranking-container">
				<h2>Rankings</h2>
				<RankingList id="rankingList"></RankingList>
			</div>
		</div>
		<div id="rightContainer" class="rightContainer">
			<h2>Latest matches</h2>
			<ChessMatchHistory :matches="matches" :pagination="true" />
		</div>
		<Tab id="chartTabs" v-bind:data="chartTabData"></Tab>
	</div>
</template>

<script>
import _ from 'lodash'
import * as firebase from 'firebase'
import { mapGetters, mapMutations, mapState } from 'vuex'
import Tab from './Tab'
import RankingList from './RankingList'
import MatchHistory from './MatchHistory'
import ChessMatchHistory from './ChessMatchHistory'
import MatchupTable from './MatchupTable'
import TimelineChart from './TimelineChart'

export default {
	name: 'Home',
	computed: {
		chartTabData () {
			return {
				options: [
					{
						name: 'Daily',
						data: this.dailyChartData,
						component: TimelineChart
					},
					{
						name: 'Weekly',
						data: this.weeklyChartData,
						component: TimelineChart
					}
				]
			}
		},
		matchupTableData () {
			return {
				title: 'Matchups',
				options: [
					{
						name: 'Versus',
						data: this.versusTableData,
						component: MatchupTable
					},
					{
						name: 'Teams',
						data: this.teammateTableData,
						component: MatchupTable
					}
				]
			}
		},
		...mapState(['matches']),
		...mapGetters(['versusTableData', 'teammateTableData', 'weeklyChartData', 'dailyChartData'])
	},
	components: {
		RankingList,
		MatchHistory,
		ChessMatchHistory,
		MatchupTable,
		TimelineChart,
		Tab
	}
}
</script>

<style lang="scss">

h2 {
	margin: 10px 0 15px 0;
}

#Home {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin-bottom: 15px;
}

.rightContainer, .leftContainer{
	display: block;
	vertical-align: top;
	height: 100%;
	width: 100%;
}

.leftContainer {
	text-align: right;
	padding-right: 15px;

	> * {
		text-align: left;
	}

	> div:not(:first-child) {
		border-top: 2px solid #e7e7e7;
		margin-top: 15px;
	}
}

.rightContainer {
	margin-top: 30px;
}

.ranking-container {
	width: 100%;
}

button, input[type='submit'], select {
	height: 30px;
	padding: 5px;
	font-size: 14px;
	border: none;
	border-radius: 3px;
	background: $primaryDarkBlue;
	color: white;
	cursor: pointer;
}

button:hover, input[type='submit']:hover {
	background: $primaryHoverColor;
}

input[type='number'] {
	height: 15px;
	padding: 5px;
}

.menuContainer > * {
	display: inline-block;
}

@media screen 
	and (min-device-width: 1200px)
	and (-webkit-min-device-pixel-ratio: 1) {

	.leftContainer, .rightContainer {
		display: inline-block;
		width: 50%;
		margin-top: 0;
	}
}
</style>
