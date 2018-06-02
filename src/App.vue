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
				<SubmitGamePopup v-on:submit="onSubmitMatch"></SubmitGamePopup>
				<AddPlayer v-on:submit="onSubmitPlayer"></AddPlayer>
			</div>
			<MatchHistory></MatchHistory>
			<Tab id="chartTabs" v-bind:data="chartTabData"></Tab>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'
import * as firebase from 'firebase'
import Elo from './libs/elo'
import ChartGenerator from './libs/ChartGenerator'
import MatchupTransformer from './libs/MatchupTableTransformer'
import Model from './libs/Model'
import RankingList from './components/RankingList'
import SubmitGamePopup from './components/SubmitGamePopup'
import MatchHistory from './components/MatchHistory'
import MatchupTable from './components/MatchupTable'
import TimelineChart from './components/TimelineChart'
import AddPlayer from './components/AddPlayer'
import Tab from './components/Tab'
import PopupContainer from './components/PopupContainer'
import { mapGetters } from 'vuex'

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
		onSubmitPlayer (name) {
			Model.addPlayer(name)
		},
		getPlayer (name) {
			for(let key in this.transformedPlayers) {
				if(this.transformedPlayers[key].name == name)
					return this.transformedPlayers[key]
			}
		},
		onSubmitMatch (game) {
			Model.submitGame(game)
		}
	},
	components: {
		RankingList,
		SubmitGamePopup,
		MatchHistory,
		MatchupTable,
		TimelineChart,
		AddPlayer,
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
