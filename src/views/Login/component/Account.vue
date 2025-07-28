<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" status-icon size="large" class="login-content-form" @keyup.enter="submitLogin">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="admin">
				<template #prefix>
					<ft-icon name="el-icon User" size="20px"></ft-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="loginForm.password" type="password" autocomplete="off" show-password placeholder="123456">
				<template #prefix>
					<ft-icon name="el-icon Unlock" size="20px"></ft-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitLogin" round :loading="loading" class="login-content-submit">登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup>
	import { useUserStore } from '@/pinia'
	// import { reactive } from 'vue'
	// import { useRouter } from 'vue-router'

	const loginForm = reactive({
		username: '',
		password: '',
	})
	const loginRules = {
		username: [
			{ required: true, message: '请输入用户名', trigger: 'blur' },
			{
				min: 3,
				max: 20,
				message: '长度在 3 到 20 个字符之间',
				trigger: 'blur',
			},
		],
		password: [
			{ required: true, message: '请输入密码', trigger: 'blur' },
			{
				min: 6,
				max: 20,
				message: '长度在 6 到 20 个字符之间',
				trigger: 'blur',
			},
		],
	}
	const loading = ref(false)

	const loginFormRef = ref()
	const router = useRouter()
	const useStore = useUserStore()

	const submitLogin = () => {
		loading.value = true
		loginFormRef.value
			.validate()
			.then(() => {
				useStore
					.login(loginForm)
					.then((res) => {
						router.push({ path: '/welcome' })
					})
					.finally(() => {
						loading.value = false
					})
			})
			.catch((err) => {
				loading.value = false
				console.error('Login validation failed:', err)
			})
	}
</script>

<style lang="scss" scoped>
	.login-content-form {
		margin-top: 20px;
		:deep(.el-input) {
			--el-border-color: #8c8c8c;
			--el-input-hover-border-color: #8c8c8c;
			.el-input__wrapper {
				background-color: transparent;
			}
		}
		.login-content-submit {
			width: 100%;
			height: 60px;
			border-radius: 8px;
			letter-spacing: 2px;
			font-weight: 300;
			margin-top: 35px;
			font-size: 22px;
			font-weight: bold;
		}
	}
</style>
