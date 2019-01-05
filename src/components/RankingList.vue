<template>
	<div class="ranking-list">
		<ol>
			<li class="header">
				<span class="position">Pos</span>
				<span class="rank">MMR</span>
				<span class="name headerName">Name</span>
				<span class="streak">Streak</span>
				<span class="winrate">Games</span>
			</li>
			<li v-for="(player, index) in rankings">
				<span class="index">{{ index + 1 }}.</span>
				<span class="mmr">{{ player.mmr }} </span>
				<span class="name">{{ player.name }}<span v-html="player.icon"></span></span>
				<span class="streak" v-if="player.streak">
					<span v-if="player.streak > 0">
							&#x1f525; {{player.streak}}
					</span>
					<span v-if="player.streak < 0">
						&#x1F4C9; {{Math.abs(player.streak)}}
					</span>
				</span>
				<span class="winrate">
					{{ player.wins || 0 }}/{{ player.remis || 0 }}/{{ player.losses || 0 }}
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

.ranking-list {
	width: 100%;
}

ol {
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
	border: 1px solid #e7e7e7;
	display: table;
}

li {
	margin: 0;
	background: #e9e9e9;
	line-height: 10px;
	padding: 3px 10px 3px 10px;
	display: table-row;
}

li:nth-child(even) {
	background: #f5f5f5;
}

li > span {
    white-space: nowrap;
	display: table-cell;
    vertical-align: middle;
    padding: 11px;
}

a {
	color: #42b983;
}

.header {
	background: lightgray;
	font-weight: bold;
}

.index {
	display: inline-block;
	padding-right: 8px;
	right: 40px;
	text-align: right;
	width: 20px;
}

.headerName {
	padding-left: 8px;
}

.mmr {
	padding-left: 10px;
}

.name {
	text-transform: capitalize;
	width: 90%;
}

.winrate,, .streak {
	width: 75px;
	margin: 0;
    font-size: 14px;
}

</style>
