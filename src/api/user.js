import request from '@/utils/request'

/* 登录 */
export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data,
    })
}

/* 退出 */
export function logout(data) {
    return request({
        url: '/auth/logout',
        method: 'post',
        data,
    })
}

/* 获取用户信息 */
export function getUserInfo(params) {
    return request({
        url: '/user/info',
        method: 'get',
        params,
    })
}
