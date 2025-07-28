<template>
	<div class="g-app-layout">
		<div class="g-app-content">
			<AppMain></AppMain>
		</div>
	</div>
</template>

<script setup>
	import AppMain from './AppMain/index.vue'
</script>

<style lang="scss" scoped>
	.g-app-layout {
		width: 100vw;
		height: 100vh;
		background-color: var(--el-bg-color-page);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.g-app-container {
			width: 100vw;
			height: calc(100vh - $gAppHeaderHeight);
			display: flex;
			.g-app-content {
				flex: 1;
				display: flex;
				flex-direction: column;
				overflow: auto;
			}
		}
	}
</style>
