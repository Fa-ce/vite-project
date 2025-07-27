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
                component: () => import('@/views/Welcome/Welcome.vue'),
            },
            {
                path: '404',
                name: '404',
                component: () => import('@/views/Error/404.vue'),
            },
            {
                path: 'redirect/:pathMatch(.*)*',
                name: 'redirect', // 重定向
                component: () => import('@/layout/index.vue'),
            },
        ],
    },
    // {
    //     path: '/Home',
    //     name: 'Home',
    //     component: () => import('@/views/Home.vue'),
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: () => import('@/views/About.vue'),
    // },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/Index.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes, // 路由配置
})

export default router
