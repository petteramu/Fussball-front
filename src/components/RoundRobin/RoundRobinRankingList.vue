<template>
	<div class="ranking-list round-robin">
		<ol>
			<li class="header">
				<span class="position">Pos</span>
				<span class="rank">Wins</span>
				<span class="name headerName">Name</span>
			</li>
			<li
				class="playerRow"
				v-for="(object, index) in rankings"
				@click="$router.push('/user/' + object.name)">
				<span class="index">{{ index + 1 }}:</span>
				<span class="mmr">{{ object.wins }} </span>
				<span class="name">{{ object.name }}</span>
			</li>
		</ol>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import RankingList from '../RankingList'
export default {
	name: 'RoundRobinRankingList',
	extends: RankingList,
	computed: {
		...mapState({
			rankings: state => state.roundRobin.rankings
		})
	}
}
</script>

<style>
@media screen 
	and (min-device-width: 1000px)
	and (-webkit-min-device-pixel-ratio: 1) {
	.ranking-list.round-robin {
		display: inline-block;
		width: 45%;
	}
}
</style>