<template>
	<!-- 多语言、换肤等配置 -->
	<el-config-provider :local="config.locale">
		<router-view v-slot="{ Component }">
			<Component :is="Component" />
		</router-view>
	</el-config-provider>
</template>

<script setup>
	import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs'

	const config = {
		locale: zhCn,
	}
</script>

<style lang="scss" scoped></style>
