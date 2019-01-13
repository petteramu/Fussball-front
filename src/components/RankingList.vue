<template>
	<div class="ranking-list">
		<ol>
			<li class="header">
				<span class="position">Pos</span>
				<span class="rank">MMR</span>
				<span class="name headerName">Name</span>
				<span class="streak">Streak</span>
				<span class="winrate">W</span>
				<span class="winrate">R</span>
				<span class="winrate">L</span>
			</li>
			<li
				class="playerRow"
				v-for="(player, index) in rankings">
				<span class="index">{{ index + 1 }}.</span>
				<span class="mmr">{{ player.mmr }} </span>
				<span class="name" @click="$router.push('/user/' + player.name)">{{ player.name }}<span v-html="player.icon"></span></span>
				<span class="streak">
					<span v-if="player.streak > 0">
							&#x1f525; {{player.streak}}
					</span>
					<span v-if="player.streak < 0">
						&#x1F4C9; {{Math.abs(player.streak)}}
					</span>
				</span>
				<span class="winrate">
					{{ player.wins || 0 }}
				</span>
				<span class="winrate">
					{{ player.remis || 0 }}
				</span>
				<span class="winrate">
					{{ player.losses || 0 }}
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
	computed: mapGetters(['rankings'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ranking-list {
	width: 100%;
}

ol {
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
	border: 1px solid $midGray;
	display: table;
}

li {
	margin: 0;
	background: $lightGray;
	line-height: 15px;
	padding: 3px 10px 3px 10px;
	display: table-row;

	&.playerRow:nth-child(odd) {
		background: $midGray;
	}
	> span {
		white-space: nowrap;
		display: table-cell;
		vertical-align: middle;
		padding: 11px;

		// Hide ranking position on mobile to save space
		&:first-child {
		    display: none;
		}
	}

	&.playerRow:hover {
		background: $primaryHoverColor;
		color: white;
		cursor: pointer;
	}
}

a {
	color: $primaryHoverColor;
}

.header {
	background: $primaryDarkBlue;
	color: white;
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

@media screen 
	and (min-device-width: 1024px)
	and (-webkit-min-device-pixel-ratio: 1) {

	li > span:first-child {
	    display: inline-block;
	}
}

</style>
