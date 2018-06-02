<template>
	<div class="ranking-list">
		<ol>
			<li class="header">
				<span class="position">Pos</span>
				<span class="rank">MMR</span>
				<span class="name headerName">Name</span>
				<span class="winrate">Win %</span>
				<span class="streak">Streak</span>

			</li>
			<li v-for="(player, index) in rankings">
				<div class="index">{{ index + 1 }}:</div>
				<span class="mmr">{{ player.mmr }} - </span>
				<span class="name">{{ capitalize(player.name) }} <span v-html="player.icon"></span></span>
				<span class="winrate">
					{{ player.winrate }}%
				</span>
				<span class="streak" v-if="player.streak">
					<span v-if="player.streak > 0">
							&#x1f525; {{player.streak}}
					</span>
					<span v-if="player.streak < 0">
						&#x1F4C9; {{Math.abs(player.streak)}}
					</span>
				</span>
			</li>
		</ol>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'ranking-list',
	props: ['data'],
	data () {
		return {}
	},
	computed: mapGetters(['rankings']),
	methods: {
		capitalize (string) {
			return string && string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ol {
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
	border: 1px solid #e7e7e7;
}

li {
	margin: 0;
	height: 30px;
	background: #e9e9e9;
	line-height: 30px;
	padding: 3px 10px 3px 10px;
}

li:nth-child(even) {
	background: #f5f5f5;
}

li > span {
	margin-right: 10px;
}

a {
	color: #42b983;
}

.header {
	background: lightgray;
}

.index {
	display: inline-block;
	padding-right: 8px;
	right: 40px;
	text-align: right;
	width: 20px;
}

.headerName {
	position: absolute;
	padding-left: 8px;
}

.mmr {
	padding-left: 10px;
}

.name {
	position: relative;
	left: 5%;
}


.winrate, .gamesPlayed, .streak {
	float: right;
	width: 75px;
	margin: 0;
}

.gamesPlayed {
	text-align: right;
	margin-right: 15px;
}

</style>
