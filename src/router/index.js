import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        redirect: '/login',
        children: [
            {
                path: '/welcome',
                name: 'Welcome',
                component: () => import('@/views/Welcome.vue'),
            },
            {
                path: '404',
                name: '404',
                component: () => import('@/views/404/index.vue'),
            },
            {
                path: 'redirect/:pathMatch(.*)*',
                name: 'redirect', // 重定向
                component: () => import('@/views/redirect/index.vue'),
            },
        ],
    },
    {
        path: '/Home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes, // 路由配置
})

export default router
