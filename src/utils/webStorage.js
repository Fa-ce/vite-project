import { isLocal } from './helper'
export const getToken = () => {
    if (isLocal()) {
        return 'token-123456'
    } else {
        // 生成环境获取token/cookie
        const result = localStorage.getItem('token')
        return result
    }
}

export const setToken = (token) => {
    localStorage.setItem('token', token)
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

export const getUserInfo = () => {
    if (isLocal()) {
        return {
            name: 'admin',
            avatar: 'https://example.com/avatar.jpg',
        }
    } else {
        const result = localStorage.getItem('userInfo')
        return JSON.parse(result)
    }
}

export const setUserInfo = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export const cleanStorage = () => {
    localStorage.clear()
}
