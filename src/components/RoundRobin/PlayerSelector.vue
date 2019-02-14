<template>
	<div id="PlayerSelector">
		<h3>Select players</h3>
		<button @click="selectAll()">Select all</button>
		<button @click="deselectAll()">Remove all</button>
		<button
			:disabled="selected.length < 2"
			@click="confirm">Confirm</button>
		<div
			class="player"
			:class="{ active: selected.indexOf(player) > -1 }"
			@click="toggleSelected(player)"
			v-if="players"
			v-for="player of Object.keys(players)">
			{{ capitalize(player) }}
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'PlayerSelector',
	data () {
		return {
			selected: []
		}
	},
	computed: {
		...mapState({
			players: state => state.players
		})
	},
	methods: {
		confirm () {
			this.$emit('confirm', this.selected)
		},
		toggleSelected (name) {
			let selectedIndex = this.selected.indexOf(name)
			if(selectedIndex > -1)
				this.selected.splice(selectedIndex, 1)
			else
				this.selected.push(name)
		},
		selectAll () {
			this.selected.length = 0
			for(var name of Object.keys(this.players)) {
				this.selected.push(name)
			}
		},
		deselectAll () {
			this.selected = []
		},
		capitalize (string) {
			return string && string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
		}
	}
}
</script>

<style scoped>
#PlayerSelector {
	display: inline-block;
	padding: 10px;
	list-style-type: none;
	border: 1px solid #e7e7e7;
	width: 100%;
}

@media screen and (min-device-width: 1200px) {
	#PlayerSelector {
		width: auto;
	}
}

.player {
	padding: 8px;
	background: #e9e9e9;
}

.player:nth-child(even) {
	background: #f5f5f5;
}

.active {
	background: #4E8098 !important;
	color: white;
}

h3 {
	margin: 10px 0 10px 0;
}

button {
	margin: 10px 10px 10px 0;
}
</style>