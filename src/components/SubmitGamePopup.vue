<template>
	<div class="submit-match">
		<button v-on:click="showPopup()">Submit game</button>
	</div>
</template>

<script>
import AddGameForm from './AddGameForm'
import Tab from './Tab'
import { mapMutations } from 'vuex'
export default {
	name: 'SubmitGamePopup',
	props: ['data'],
	methods: {
		onSubmit (eventObj) {
			this.showPopup = false
			this.$emit('submit', eventObj)
		},
		showPopup () {
			this.setActivePopup(AddGameForm)
		},
		...mapMutations(['setActivePopup'])
	},
	components: {
		Tab,
		AddGameForm
	}
}

</script>

<style scoped>
.submit-match {
	padding: 5px;
}

h4 {
	margin: 0;
}

.popupContainer {
	z-index: 100;
	position: absolute;
    left: -25%;
    background: #f3f3f3;
    top: 25%;
    padding: 15px;
    border: 1px solid #e1e1e1;
    min-width: 300px;
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