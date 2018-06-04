<template>
	<div id="addPlayer" class="add-player">
		<form id="add-player-form">
			<h2>Add player</h2>
			<div class="boxContainer">
				<span class="box">
					<input type="text" id="playerName" v-model="name" placeholder="Name" />
				</span>
			</div>
			<input type="submit" v-on:click="onSubmit">
		</form>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
	name: 'AddPlayerForm',
	data: function() {
		return {
			name: undefined
		}
	},
	methods: {
		onSubmit (e) {
			e.preventDefault()
			if(this.name != '' && this.name != undefined) {
				this.addPlayer(this.name.toLowerCase())
				this.resetActivePopup()
			}
		},
		...mapMutations(['resetActivePopup']),
		...mapActions(['addPlayer'])
	}
}
</script>

<style scoped>
.add-player {
	padding: 5px;
}

form select, form input {
	margin: 5px;
}

.boxContainer > span {
	display: inline-block;
	border: 1px solid #e7e7e7;
	padding: 5px;
}

h4 {
	margin: 0;
}

.popupContainer {
	position: absolute;
	left: -25%;
	background: #f3f3f3;
	top: 25%;
	padding: 15px;
	border: 1px solid #e1e1e1;
	min-width: 300px;
	z-index: 100;
}

.backgroundFade {
	position: fixed;
	left: 0;
	top: 0;
	width:100%;
	height:100%;
	background: rgba(0, 0, 0, 0.3);
	z-index: 2;
}

.close {
	height: 30px;
	width: 30px;
	border-radius: 5px;
	position: absolute;
	right: 15px;
}

.close:hover {
	background: #e1e1e1;
	cursor: pointer;
}

</style>