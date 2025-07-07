<template>
    <div>
        <el-dropdown>
            <span></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script setup>
    import { useUserStore } from '@/pinia'
    const useUserStore = useUserStore()
</script>

<style lang="scss" scoped></style>
