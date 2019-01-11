<template>
	<div
		id="ScheduledMatchHistory"
		class="matchHistory">
		<PopupWrapper
			@hide="resetPopup"
			v-if="popupVisible">
			<AddGameResult
				:data="popupData"
				@confirm="onAddGame"></AddGameResult>
		</PopupWrapper>
		<div
			v-for="match of data"
			class="match"
			@click="onOpen(match)">
			<div class="whiteContainer">
				<span v-bind:class="getPlayerColor(match, 'white')">
					<div>{{ (match.white.key) }}
						<span v-if="match.white.gain !== undefined">
							(+{{ Math.round(Math.abs(match.white.gain)) }})
						</span>
						<span v-if="match.white.loss !== undefined">
							(-{{ Math.round(Math.abs(match.white.loss)) }})
						</span>
					</div>
				</span>
			</div>
			<div class="blackContainer">
				<span v-bind:class="getPlayerColor(match, 'black')">
					<div>{{ (match.black.key) }}
						<span v-if="match.black.gain !== undefined">
							(+{{ Math.round(Math.abs(match.black.gain)) }})
						</span>
						<span v-if="match.black.loss !== undefined">
							(-{{ Math.round(Math.abs(match.black.loss)) }})
						</span>
					</div>
				</span>
			</div>
			<div
				v-if="match.winner !== undefined"
				class="result">{{ getResult(match) }}</div>
			<div
				v-if="match.timestamp"
				class="timestamp">{{ formatDate(match.timestamp) }}</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddGameResult from './AddGameResult'
import PopupWrapper from '../PopupWrapper'
export default {
	name: 'ScheduledMatchHistory',
	props: ['data'],
	methods: {
		getPlayerColor (match, color) {
			if(match.winner === 'remis')
				return ''
			if(color === 'white' && match.winner !== undefined)
				return match.winner === 'white' ? 'winner' : 'loser'
			if(color === 'black' && match.winner !== undefined)
				return match.winner === 'black' ? 'winner' : 'loser'
			return ''
		},
		getResult (match) {
			if(match.winner === 'white')
				return '1 - 0'

			if(match.winner === 'black')
				return '0 - 1'

			return '0.5 - 0.5'
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
		onOpen (match) {
			if(match.winner !== undefined) return
			this.setPopupData(match)
			this.setPopupVisible(true)
		},
		onAddGame (winner) {
			const match = this.popupData
			this.resetPopup()

			match.winner = winner
			this.addMatch({
				match: {
					winner: winner,
					white: match.white.key,
					black: match.black.key
				},
				callback: (err, data) => {
					if(err)
						return console.log(err)

					this.updateMatch({
						originalMatch: match,
						newMatch: data.game
					})

					this.calculatePoints(data.game)
				}
			})
		},
		...mapMutations({
			setPopupData: 'scheduledMatches/setAddGameData',
			setPopupVisible: 'scheduledMatches/setAddGameVisible',
			resetPopup: 'scheduledMatches/resetAddGamePopup',
			updateMatch: 'roundRobin/updateMatch',
			calculatePoints: 'roundRobin/calculatePoints'
		}),
		...mapActions(['addMatch'])
	},
	computed: {
		...mapState({
			popupData: state => state.scheduledMatches.addGameData,
			popupVisible: state => state.scheduledMatches.addGameVisible
		})
	},
	components: {
		AddGameResult,
		PopupWrapper
	}
}
</script>

<style>
#ScheduledMatchHistory {
	list-style-type: none;
	padding: 0;
	margin: 0;
	border: 1px solid #e9e9e9;
	vertical-align: top;
	width: 100%;
}

@media screen 
	and (min-device-width: 1000px)
	and (-webkit-min-device-pixel-ratio: 1) {
	#ScheduledMatchHistory {
		display: inline-block;
		float: right;
	}
}
</style>