<template>
	<div id="app">
		<PopupContainer />
		<MenuBar />
		<div class="loader" v-if="!matches || !players">
			Please wait...
		</div>
		<div class="site" v-if="matches && players">
			<router-view></router-view>
		</div>
		<footer>
			Copyright &copy; 2019 Petter Amundsen
		</footer>
	</div>
</template>

<script>
import PopupContainer from './components/PopupContainer'
import MenuBar from './components/MenuBar'
import { mapState } from 'vuex'
export default {
	name: 'app',
	methods: {
		goBack () {
			window.history.length > 1
				? this.$router.go(-1)
				: this.$router.push('/')
		}
	},
	computed: {
		...mapState(['matches', 'players'])
	},
	components: {
		PopupContainer,
		MenuBar
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');

html {
  height: 100%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
	background-color: #f7f7f7;
	font-family: "Roboto", sans-serif;
	letter-spacing: 0.03em;
	font-size: 14px;
	margin: 0;
	height: 100%;
}

a {
	position: relative;
}

#app {
	padding: 0 0 25px 0;
	position: relative;
	margin: 0;
	min-height: 100%;
}

.loader {
	position: absolute;
	margin: 25% 0 0 50%;
	transform: translateX(-50%);
}

.site {
	width: 100%;
	margin-left: 50%;
	transform: translateX(-50%);
	padding: 0 15px 0 15px;
}

footer {
	width: 100%;
	position: absolute;
	bottom: 0;
	padding: 0 15px 0 15px;
	height: 30px;
	color: $darkGray;
		font-size: 12px;
}

@media screen 
	and (min-device-width: 1024px)
	and (-webkit-min-device-pixel-ratio: 1) {

	body {
		font-size: 14px;
	}

	.site {
		padding: 0;
	}

	.site, footer {
		width: 1024px;
	}

	footer {
		margin-left: 50%;
		transform: translateX(-50%);
		padding: 0;
		font-size: 14px;
	}
}
</style>