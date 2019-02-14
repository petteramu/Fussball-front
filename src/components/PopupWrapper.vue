<template>
	<div
		class="popupWrapper">
		<div
			class="backgroundFade"
			v-on:click="hide"></div>

		<div class="slotContainer">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PopupWrapper',
	methods: {
		hide () {
			this.$emit('hide')
		}
	}
}
</script>

<style scoped>
.popupWrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
.slotContainer {
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