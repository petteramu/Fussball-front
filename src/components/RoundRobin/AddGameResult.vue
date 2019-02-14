<template>
	<div id="AddGameResult">
		<h2>Set winner</h2>
		<h4 v-if="data">
			{{ data.white.key }} vs {{ data.black.key }}
		</h4>
		<button @click="onClick('white')">White</button>
		<button @click="onClick('remis')">Remis</button>
		<button @click="onClick('black')">Black</button>
	</div>
</template>

<script>
export default {
	name: 'AddGameResult',
	props: ['data'],
	methods: {
		onClick (winner) {
			this.$emit('confirm', winner)
		}
	}
}
</script>

<style scoped>
	button {
		padding: 20px;
		margin: 10px;
		line-height: 0px;
	}
</style>