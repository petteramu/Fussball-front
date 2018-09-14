<template>
	<div>
		<h2>Match</h2>
		<div>
			<b>{{ capitalize(match.white.key) }}</b> - 
			<b>{{ capitalize(match.black.key) }}</b>
			<br />
			Winner: {{ match.winner }}
		</div>
		<div><i>{{ formatDate(match.timestamp) }}</i></div>
		<div>
			<button @click="confirmDeleteVisible = true" :disabled="confirmDeleteVisible">Delete Match</button>
			<button @click="deleteMatch()" v-if="confirmDeleteVisible">Are you sure?</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
	name: 'RemoveMatchPopup',
	data: function() {
		return {
			confirmDeleteVisible: false
		}
	},
	computed: {
		...mapState({match: 'removeMatchObject'})
	},
	methods: {
		capitalize (str) {
			return _.capitalize(str)
		},
		formatDate (timestamp) {
			let monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			let date = new Date(timestamp)
			let hh = date.getHours()
			let mm = date.getMinutes()
			if(hh < 10) hh = "0" + hh;
			if(mm < 10) mm = "0" + mm;
			return hh + ':' + mm + ' - ' + date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
		},
		deleteMatch () {
			this.removeMatch(this.match)
			this.resetRemoveMatchObject()
			this.resetActivePopup()
		},
		...mapActions(['removeMatch']),
		...mapMutations(['resetRemoveMatchObject', 'resetActivePopup'])
	}
}

</script>

<style scoped>
div {
	margin-top: 15px;
}
</style>