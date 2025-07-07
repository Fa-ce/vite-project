export const innerRoutes = [
    {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
            title: '首页看板',
            icon: 'iconfont icon-dashboard',
            keepAlive: true,
        },
    },
    {
        path: 'system',
        name: 'system',
        meta: {
            title: '系统设置',
            icon: 'iconfont icon-setting',
        },
        children: [
            {
                path: 'user',
                name: 'user',
                component: () => import('@/views/system/user/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'iconfont icon-user',
                    keepAlive: true,
                },
            },
            {
                path: 'role',
                name: 'role',
                component: () => import('@/views/system/role/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'iconfont icon-user',
                    keepAlive: true,
                },
            },
            {
                path: '/system/auth',
                name: 'system:auth',
                component: () => import('@/views//system/auth/index.vue'),
                meta: {
                    title: '权限管理',
                    icon: 'iconfont icon-user',
                    keepAlive: true,
                },
            },
        ],
    },
]
