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
					<b>Games:</b> {{ userData.wins || 0 + userData.losses || 0 + userData.remis || 0 }}({{ userData.wins || 0 }}/{{userData.remis || 0 }}/{{userData.losses || 0 }})
				</span>
			</div>

			<div class="halfContainer">
				<h2>Matchups</h2>
				<div v-for="matchup, key of userMatchups" class="matchup">
					<Matchups
						:matchup="matchup"
						:opponent="key" />
				</div>
			</div>
			<div class="halfContainer">
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
}

h1 {
	text-transform: capitalize;
	font-size: 38px;
	margin: 5px 0 5px 0;
}

span {
	vertical-align: top;
}

.halfContainer {
	vertical-align: top;
	&:nth-child(2) {
		padding-right: 15px;
	}
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

	.halfContainer {
		display: inline-block;
		width: 50%;
	}
}
</style>