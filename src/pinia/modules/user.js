import userApi, { logout } from '@/api/user'
const { isLocal } = require('@/utils/helper')
import {
    getToken,
    setToken,
    getUserInfo as getUserInfoStorage,
    setUserInfo,
} from '@/utils/webStorage'
import { innerRoutes } from '@/router/router.config'
import { flattenTree } from '@/utils/dealData'
import router from '@/router'

const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: getToken(),
            userInfo: getUserInfoStorage(),
            routes: [],
            buttons: [],
            permissions: [],
        }
    },
    actions: {
        login(data) {
            return new Promise((resolve, reject) => {
                userApi
                    .login(data)
                    .then((res) => {
                        this.token = res.data
                        setToken(res.data)
                        resolve(res)
                    })
                    .catch((err) => reject(err))
            })
        },
        getUserInfo() {
            return new Promise((resolve, reject) => {
                if (isLocal()) {
                    this.userInfo = {
                        nickName: '本地用户-Face',
                        avatar: 'https://example.com/avatar.png',
                    }
                    this.buttons = ['system:role:delete', 'system:role:config']
                    // 本地缓存个人信息
                    setUserInfo(this.userInfo)
                    // 动态加载路由
                    this.routes = innerRoutes
                    flattenTree(this.routes).forEach((item) => {
                        item.addRoute('layout', item)
                    })
                    resolve(this.userInfo)
                } else {
                    // TODO: 从服务器获取用户信息
                }
            })
        },
        logOut() {
            return new Promise((resolve, reject) => {
                logout()
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((e) => {
                        reject(e)
                    })
                    .finally(() => {
                        this.fedLogout()
                    })
            })
        },
        fedLogout() {
            // 清除本地存储的用户信息
            cleanStorage()
            router.push('/login')
            window.location.reload()
        },
    },
})

export default useUserStore
