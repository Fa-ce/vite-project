import router from '@/router'
import { useUserStore } from '@/pinia'
import { getToken } from './utils/webStorage'
import NProgress from 'nprogress' // progress bar

// 白名单
const whiteList = ['/login', '/404'] // no redirect whitelist
// 是否已经加载路由
let routerIsLoaded = false
const isLocal = import.meta.env.VITE_LOCAL === 'true' // 是否加载本地路由

// 加载路由
export const loadRoutes = async (to, from, next) => {
	// 拿到用户信息
	const userStore = useUserStore()
	await userStore.getUserInfo()
	routerIsLoaded = true // 设置路由加载完成
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
	// 开启进度条
	NProgress.start()

	// 设置页面标题
	if (to.meta.title) {
		document.title = to.meta.title
	}
	// 跳转到登录页面,不同用户权限不同，重新加载路由
	if (to.path === '/login') {
		routerIsLoaded = false
		return next()
	}
	// 白名单直接放行
	if (whiteList.includes(to.path)) {
		return next()
	}
	// 判断是否需要登录
	if (getToken()) {
		// 判断是否加载路由
		if (routerIsLoaded) {
			if (to.matched.length) {
				return next()
			} else {
				next('/404')
			}
		} else {
			// 路由未加载，则等待路由加载完成后，进行下一步
			await loadRoutes(to, from, next)
			return next(to)
		}
	} else {
		// 未登录，跳转到登录页面
		return next('/login')
	}
})
router.afterEach(() => {
	// 关闭进度条
	NProgress.done()
})
