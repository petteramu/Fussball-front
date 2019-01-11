<template>
	<div id="User">
		<span v-if="!userData">
			<h1>User: {{ username }} not found</h1>
		</span>
		<span v-else>
			<div class="infoContainer">
				<h1>{{ username }}</h1>
				
				<span class="info">
					<b>Rating:</b> {{ Math.round(userData.ranking) }}
				</span>

				<span class="info" v-if="userData.peak">
					<b>Peak:</b> {{ Math.round(userData.peak) }}
				</span>

				<span class="info">
					<b>Games:</b> {{ userData.wins + userData.losses + userData.remis }}({{ userData.wins }}/{{userData.losses }}/{{userData.remis }})
				</span>

				<h2>Matchups</h2>
				<div v-for="matchup, key of userMatchups" class="matchup">
					<Matchups
						:matchup="matchup"
						:opponent="key" />
				</div>
			</div>

			<div class="matchContainer">
				<h2>Latest matches</h2>
				<ChessMatchHistory :matches="userMatches" :pagination="true" />
			</div>
		</span>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChessMatchHistory from '../ChessMatchHistory'
import Matchups from './Matchups'
export default {
	name: 'User',
	computed: {
		username () {
			return this.$route.params.name
		},
		userData () {
			return this.getUser(this.username)
		},
		userMatches () {
			return this.getUserMatches(this.username)
		},
		userMatchups () {
			return this.getUserMatchups(this.username)
		},
		...mapGetters(['getUserMatches', 'getUser', 'getUserMatchups'])
	},
	components: {
		ChessMatchHistory,
		Matchups
	}
}

</script>

<style scoped lang="scss">
#User {
	padding: 15px;
}

h1 {
	text-transform: uppercase;
	font-size: 38px;
	margin: 0;
}

span {
	vertical-align: top;
}

.matchContainer, .infoContainer {
	padding: 10px;
	vertical-align: top;
}

.matchup {
	border: 1px solid #e9e9e9;
	background: #e5e5e5;
	&:nth-child(even) {
		background: #f5f5f5;
	}
}

@media screen 
	and (min-device-width: 1200px)
	and (-webkit-min-device-pixel-ratio: 1) {

	.matchContainer, .infoContainer {
		display: inline-block;
		width: 50%;
	}
}
</style>