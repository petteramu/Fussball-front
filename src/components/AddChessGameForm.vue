<template>
	<form id="add-game-form">
		<h2>Submit game</h2>
		<div class="boxContainer">
			<span>
				<h4>White:</h4>
				<span class="box">
					<div
						v-for="player in players"
						:key="player"
						v-if="black !== player"
						:class="{ active: white === player , playerElement: true }"
						@click="toggleWhite(player)"
					>{{ player }}</div>
				</span>
			</span>
			<span>
				<h4>Black:</h4>
				<span class="box">
					<div
						v-for="player in players"
						:key="player"
						v-if="white !== player"
						:class="{ active: black === player , playerElement: true }"
						@click="toggleBlack(player)"
					>{{ player }}</div>
				</span>
			</span>
		</div>
		<div>
			Winner:
			<div 
				:class="{ active: winner == 'white'}"
				class="difference"
				@click="winner = 'white'">White</div>
			<div 
				:class="{ active: winner == 'remis'}"
				class="difference"
				@click="winner = 'remis'">Remis</div>
			<div 
				:class="{ active: winner == 'black'}"
				class="difference"
				@click="winner = 'black'">Black</div>
		</div>
		<input type="submit" v-on:click="onSubmit">
	</form>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
	name: 'AddChessGameForm',
	data: function() {
		return {
			winner: undefined,
			white: undefined,
			black: undefined
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

			let array = _.uniq([this.white, this.black])
			array = _.compact(array)
			if(array.length < 2) {
				alert("Error: Two or more players are the same")
				return
			}
			this.addMatch({
				winner: this.winner,
				white: this.white,
				black: this.black
			})
			this.resetActivePopup()
		},

		toggleWhite (name) {
			if(this.white === name)
				this.white = undefined
			else {
				this.white = name
			}
		},

		toggleBlack (name) {
			if(this.black === name)
				this.black = undefined
			else {
				this.black = name
			}
		},
		...mapActions(['addMatch']),
		...mapMutations(['resetActivePopup'])
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
	min-width: 25px;
	text-align: center;
	border-radius: 5px;
}

.active {
	background: #4E8098 !important;
	color: white;
}
</style>
