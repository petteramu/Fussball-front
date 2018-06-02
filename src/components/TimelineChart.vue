<template>
	<div id="timelineChart" class="timelineChart">
		<canvas id="chart" v-bind:data="data" class="chart" width="400" height="200"></canvas>
	</div>
</template>

<script>
import Chart from 'chart.js'
import _ from 'lodash'
export default {
	name: 'TimelineChart',
	props: ['data'],
	data: function() {
		return {
			chart: undefined
		}
	},
	methods: {
		setupChart () {
			let datasets = this.createDataObjects(this.data.values)
			let ele = document.getElementById("chart")
			this.chart = new Chart(ele, {
				type: 'line',
				options: {
					responsive: true,
					maintainAspectRatio: true,
					scales: {
						xAxes: [{
							scaleLabel: {
								display: true,
								labelString: this.data.xLabel
							}
						}]
					}
				},
				data: {
					labels: this.data.labels,
					datasets: datasets
				}
			})
		},
	destroyChart () {
		this.chart.destroy()
	},
	createDataObjects (players) {
		let colors = ['red', 'green', 'blue', 'magenta', 'purple', 'lightblue', 'pink', 'darkred', 'brown', 'grey', 'darkgrey', 'black']
		return _.map(players, function(player) {
			return {
				label: player.name,
				fill: false,
				lineTension: 0.1,
				data: player.values,
				borderColor: colors.shift()
			}
		})
	}
	},
	updated () {
		if(this.chart != undefined)
			this.destroyChart()
			this.setupChart()
	},
	destroyed () {
		if(this.chart != undefined)
			this.chart.destroy()
	}
}
</script>

<style scoped>

</style>
