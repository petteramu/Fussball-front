<template>
	<div
		class="popupContainer"
		v-if="activePopup">
		<div
			class="backgroundFade"
			v-on:click="hide"></div>
		<component
			class="widget"
			:data="activePopup.data"
			:is="activePopup.component"></component>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'PopupContainer',
	computed: {
		...mapState(['activePopup'])
	},
	methods: {
		hide () {
			this.setActivePopup(undefined)
		},
		onEvent (data) {
			this.$emit(data)
		},
		...mapMutations(['setActivePopup'])
	}
}
</script>

<style scoped>
.popupContainer {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
.popupContainer > .widget {
	z-index: 100;
	position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: #f3f3f3;
    top: 25%;
    padding: 15px;
    border: 1px solid #e1e1e1;
    min-width: 300px;
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
</style>