<template>
    <!-- 多语言、换肤等配置 -->
    <el-config-provider local="zh-cn">
        <router-view v-slot="{ Component }">
            <Component :is="Component" />
        </router-view>
    </el-config-provider>
</template>

<script setup>
    import zhCn from 'element-plus/lib/locale/lang/zh-cn'
    const config = {
        locale: zhCn,
        size: 'default',
        zIndex: 2000,
    }
</script>

<style lang="scss" scoped></style>
