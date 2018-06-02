<template>
	<div id="addPlayer" class="add-player">
		<button id="addPlayerButton" v-on:click="showPopup=true">Add player</button>
		<div class="backgroundFade" v-if="showPopup" v-on:click="showPopup=false"></div>
		<div v-if="showPopup" id="popupContainer" class="popupContainer">
			<button class='close' v-on:click="showPopup=false">X</button>
			<form id="add-player-form">
				<h2>Add player</h2>
				<div class="boxContainer">
					<span class="box">
						<input type="text" id="playerName" placeholder="Name" />
					</span>
				</div>
				<input type="submit" v-on:click="onSubmit">
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AddPlayer',
	data () {
		return {
			showPopup: false
		}
	},
	methods: {
		onSubmit (e) {
			e.preventDefault()
			let name = document.getElementById("playerName").value
			if(name != '' && name != undefined)
				this.$store.dispatch('addPlayer', name.toLowerCase())
			this.showPopup = false
		}
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