<template>
	<form id="add-game-form">
		<h2>Submit game</h2>
		<div class="boxContainer">
			<span>
				<h4>Winners:</h4>
				<span class="box">
					<div
						v-for="player in players"
						:key="player"
						v-if="losers.indexOf(player) === -1"
						:class="{ active: winners.indexOf(player) > -1 , playerElement: true }"
						@click="toggleWinner(player)"
					>{{ player }}</div>
				</span>
			</span>
			<span>
				<h4>Losers:</h4>
				<span class="box">
					<div
						v-for="player in players"
						:key="player"
						v-if="winners.indexOf(player) === -1"
						:class="{ active: losers.indexOf(player) > -1 , playerElement: true }"
						@click="toggleLoser(player)"
					>{{ player }}</div>
				</span>
			</span>
		</div>
		<div>
			Goal difference:
			<div
				v-for="difference in maxDifference"
				:key="difference"
				:class="{ active: activeDifference == difference, difference}"
				@click="activeDifference = difference"
			>{{ difference }}</div>
		</div>
		<input type="submit" v-on:click="onSubmit">
	</form>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
	name: 'AddGameForm',
	data: function() {
		return {
			maxDifference: 5,
			activeDifference: 1,
			winners: [],
			losers: []
		}
	},
	computed: {
		...mapState({
			players: (state) => {
				return Object.keys(state.players).sort()
			}
		})
	},
	methods: {
		onSubmit (e) {
			e.preventDefault()

			const array = _.uniq(this.winners.concat(this.losers))
			if(array.length < 4) {
				alert("Error: Two or more players are the same")
				return
			}
			this.$store.dispatch('addMatch', {
				difference: this.activeDifference,
				winners: this.winners,
				losers: this.losers
			})
		},

		toggleWinner (name) {
			const index = this.winners.indexOf(name)
			if(index > -1) {
				this.winners.splice(index, 1)
			}
			else if(this.winners.length == 2)
				return
			else {
				this.winners.push(name)
			}
		},

		toggleLoser (name) {
			const index = this.losers.indexOf(name)
			if(index > -1) {
				this.losers.splice(index, 1)
			}
			else if(this.losers.length == 2)
				return
			else {
				this.losers.push(name)
			}
		}
	}
}
</script>
<style scoped>
form select, form input {
	margin: 5px;
}

h4 {
	margin: 0;
	background: #e9e9e9;
	padding: 5px 5px 5px 15px;
	min-width: 200px;
}

h2 {
	margin: 5px 0;
}

.boxContainer > span {
	display: inline-block;
	border: 1px solid #e7e7e7;
	padding: 5px;
	vertical-align: top;
}

.boxContainer > span:first-child {
	margin-right: 15px;
}

.playerElement {
	padding: 5px 5px 5px 15px;
	text-transform: capitalize;
}
.playerElement:nth-child(even) {
	background:	#e9e9e9;
}

.difference {
	background: #e9e9e9;
	padding: 8px;
	display: inline-block;
	margin: 10px;
	width: 25px;
	text-align: center;
	border-radius: 5px;
}

.active {
	background: #4E8098 !important;
	color: white;
}
</style>
