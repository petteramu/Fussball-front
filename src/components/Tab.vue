<template>
	<div class='tabElement'>
		<h2 class="title" v-if="data.title">{{ data.title }}</h2>
		<div class="tab" v-for="option in data.options" :key="option.name" @click="onTabChanged(option)">{{ option.name }}</div>
		<div class="componentContainer">
			<component v-on:bubblingEvent="bubbleEvent" v-bind:is="currentComponent" v-bind:data="currentData"></component>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'

export default {
	name: 'Tabs',
	props: ['data'],
	data () {
		return  {
			currentOptionObject: undefined
		}
	},
	methods: {
		onTabChanged (option) {
			this.currentOptionObject = option
		},
		bubbleEvent (eventObj) {
			this.$emit('bubblingEvent', eventObj)
		}
	},
	computed: {
		currentData () {
			if (this.currentOptionObject !== undefined)
				return this.currentOptionObject.data
			return _.get(this.data, 'options[0].data')
		},
		currentComponent () {
			if (this.currentOptionObject !== undefined)
				return this.currentOptionObject.component
			return _.get(this.data, 'options[0].component')
		}
	}
}
</script>

<style scoped>
.tabElement {
	padding-top: 15px;
}
.tab {
	display: inline-block;
	margin-right: 5px;
	padding: 5px;
	border: 1px solid #c5c5c5;
	border-bottom: none;
	position: relative;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px; 
}

.tab:hover {
	background: #c5c5c5;
	cursor: pointer;
}

.componentContainer {
	border: 1px solid #c5c5c5;
	margin: 0;
	padding: 15px;
	overflow-x: auto;
}
</style>