<template>
	<div class="PlayerDetails">
		<div class="backgroundFade" @click="$emit('close')"></div>
		<div class="popupContainer">
			<div class="topContainer">
				<span>
					{{ player.name }}
				</span>
				<span class="ratingContainer">
					{{ player.ranking['2v2'] }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import MatchupTransformer from '../libs/MatchupTableTransformer'
import MatchHistory from './/MatchHistory'
import MatchupTable from './/MatchupTable'
import TimelineChart from './/TimelineChart'
import Model from '../libs/Model'
import Tab from './Tab'
export default {
	name: 'PlayerDetails',
	props: ['player', 'matches'],
	computed: {
		losingStreak () {
			let matches = this.matches

		}
	}
}
</script>

<style scoped>
.popupContainer {
	width: 1200px;
	min-height: 800px;
	padding: 15px;
	box-shadow: 0px 0px 15px 5px #888;
	background: white;
	position: absolute;
	z-index: 100;
	left: 50%;
	transform: translateX(-50%);
	border: 1px solid #e1e1e1;
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

.topContainer span {
	width: 48%;
	display: inline-block;
	font-size: 48px;
}

.topContainer span:last-child {
	text-align: right;
}

</style>