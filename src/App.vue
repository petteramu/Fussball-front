<template>
	<div id="app">
		<div class="menuBar">
			<router-link to="/">Home</router-link>
			<router-link to="/roundRobin">Create round robin</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	methods: {
		goBack () {
			window.history.length > 1
				? this.$router.go(-1)
				: this.$router.push('/')
		}
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
    box-sizing: border-box;
}

body {
	background-color: #f7f7f7;
	font-family: "Roboto", sans-serif;
	margin: 0;
}

a {
	position: relative;
}

.menuBar {
	height: 40px;
	background: #30343F;
	width: 100%;
}

.menuBar a {
	color: white;
	text-decoration: none;
	margin: 15px;
	line-height: 40px;
}
</style>
