<template>
	<div id="menuBar">
		<div class="menuContent">
			<router-link to="/">Nf6 & Chill</router-link>

			<div
				class="collapsible"
				:class="{ visible: showMenu }"
				@click="showMenu = !showMenu">
				<div class="mobileHeader">Menu &#9776;</div>
				<a href="#" @click="showAddGameForm($event)">Submit game</a>
				<a href="#" v-on:click="showAddPlayerForm($event)">Add player</a>
				<router-link to="/roundRobin">Tournament</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import AddPlayerForm from './AddPlayerForm'
import AddChessGameForm from './AddChessGameForm'
import { mapMutations } from 'vuex'
export default {
	name: 'MenuBar',
	data () {
		return { showMenu: false }
	},
	methods: {
		showAddPlayerForm (e) {
			e.preventDefault()
			this.setActivePopup({ component: AddPlayerForm })
		},
		showAddGameForm (e) {
			e.preventDefault()
			this.setActivePopup({ component: AddChessGameForm })
		},
		...mapMutations(['setActivePopup'])
	}
}
</script>

<style lang="scss">
#menuBar {
	height: 40px;
	background: $primaryDarkBlue;
	width: 100%;
	margin-bottom: 15px;
	position: relative;
	box-sizing: content-box;

	.menuContent {
		padding: 0 15px 0 15px;
	}

	a, .mobileHeader {
		color: white;
		text-decoration: none;
		margin-right: 30px;
		line-height: 40px;
	}

	a {
		text-transform: uppercase;
		border-bottom: rgba(0, 0, 0, 0) 2px solid;
		transition: color 0.25s, border 0.25s;
		&:hover {
			border-bottom: $primaryHoverColor 2px solid;
			color:  $primaryHoverColor;
		}
		&:first-child {
			font-size: 18px;
		}
		&:not(first-child) {
			vertical-align: middle;
		}
	}

	.collapsible {
		cursor: pointer;
		display: inline-block;
	}
}

@media screen 
	and (max-device-width: 1024px)
	and (-webkit-min-device-pixel-ratio: 1) {

	.collapsible {
		background: $primaryDarkBlue;
		position: absolute;
		display: inline-block;
		width: fit-content;
		right: 0;
		font-size: 14px;
		letter-spacing: 1px;
		padding: 0 15px 0 10px;

		> a {
			display: none;
		}

		&.visible {
			z-index: 2;
			> a {
				display: block;
			}
		}
	}
}

@media screen 
	and (min-device-width: 1024px)
	and (-webkit-min-device-pixel-ratio: 1) {

	#menuBar .menuContent {
		width: 1024px;
		margin-left: 50%;
		transform: translateX(-50%);
		padding: 0;

		.collapsible {
			.mobileHeader {
				display: none;
			}
		}
	}
}
</style>