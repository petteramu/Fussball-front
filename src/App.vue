<template>
	<div id="app">
		<PopupContainer></PopupContainer>
		<div id="rightContainer" class="rightContainer">
			<div class="ranking-container">
				<RankingList id="rankingList"></RankingList>
			</div>
			<Tab v-bind:data="matchupTableData"></Tab>
		</div>
		<div id="leftContainer" class="leftContainer">
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
import Tab from './components/Tab'
import RankingList from './components/RankingList'
import MatchHistory from './components/MatchHistory'
import ChessMatchHistory from './components/ChessMatchHistory'
import MatchupTable from './components/MatchupTable'
import TimelineChart from './components/TimelineChart'
import AddPlayerForm from './components/AddPlayerForm'
import AddGameForm from './components/AddGameForm'
import AddChessGameForm from './components/AddChessGameForm'
import PopupContainer from './components/PopupContainer'

export default {
	name: 'app',
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
@import url('https://fonts.googleapis.com/css?family=Roboto');
body {
	background-color: #f7f7f7;
}
#app {
	font-family: "Roboto", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
	margin-bottom: 15px;
}

.leftContainer {
	position: absolute;
	right: 0;
	width: 50%;
	text-align: right;
	padding: 15px;
	top:0;
	height: 100%;
}

.rightContainer {
	position: absolute;
	left: 0;
	width: 40%;
	padding: 15px;
	top:0;
	height: 100%;
}

.leftContainer > * {
	text-align: left;
}

.leftContainer > div:not(:first-child) {
	border-top: 2px solid #e7e7e7;
	margin-top: 15px;
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
</style>
