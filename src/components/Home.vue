<template>
	<div id="Home">
		<PopupContainer></PopupContainer>
		<div id="leftContainer" class="leftContainer">
			<div class="ranking-container">
				<RankingList id="rankingList"></RankingList>
			</div>
			<Tab v-bind:data="matchupTableData"></Tab>
		</div>
		<div id="rightContainer" class="rightContainer">
			<div class="menuContainer">
				<button @click="showAddGameForm()">Submit game</button>
				<button v-on:click="showAddPlayerForm()">Add player</button>
			</div>
			<ChessMatchHistory></ChessMatchHistory>
			<Tab id="chartTabs" v-bind:data="chartTabData"></Tab>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'
import * as firebase from 'firebase'
import { mapGetters, mapMutations } from 'vuex'
import Tab from './Tab'
import RankingList from './RankingList'
import MatchHistory from './MatchHistory'
import ChessMatchHistory from './ChessMatchHistory'
import MatchupTable from './MatchupTable'
import TimelineChart from './TimelineChart'
import AddPlayerForm from './AddPlayerForm'
import AddGameForm from './AddGameForm'
import AddChessGameForm from './AddChessGameForm'
import PopupContainer from './PopupContainer'

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
		...mapGetters(['versusTableData', 'teammateTableData', 'weeklyChartData', 'dailyChartData'])
	},
	methods: {
		showAddPlayerForm () {
			this.setActivePopup(AddPlayerForm)
		},
		showAddGameForm () {
			this.setActivePopup(AddChessGameForm)
		},
		...mapMutations(['setActivePopup'])
	},
	components: {
		RankingList,
		MatchHistory,
		ChessMatchHistory,
		MatchupTable,
		TimelineChart,
		AddPlayerForm,
		AddGameForm,
		AddChessGameForm,
		PopupContainer,
		Tab
	}
}
</script>

<style>
body {
	background-color: #f7f7f7;
	font-size: 14px;
}
#Home {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-bottom: 15px;
}

.leftContainer {
	text-align: right;
}

.rightContainer, .leftContainer{
	display: block;
	vertical-align: top;
	padding: 15px;
	height: 100%;
	width: 100%;
}
.leftContainer > * {
	text-align: left;
}

.leftContainer > div:not(:first-child) {
	border-top: 2px solid #e7e7e7;
	margin-top: 15px;
}

.ranking-container {
	width: 100%;
}

button, input[type='submit'], select {
	height: 30px;
	padding: 5px;
	font-size: 14px;
	border: 1px solid #a9a9a9;
	background: #fff;
	cursor: pointer;
}

button:hover, input[type='submit']:hover {
	background: #efefef;
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
	}
}
</style>
