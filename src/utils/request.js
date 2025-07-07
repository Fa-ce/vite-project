// 引入axios库
const axios = require('axios')

import { getToken } from '@/utils/webStorage'
import qs from 'qs'

const service = axios.create({
    // baseURL: import.meta.env.VITE_BASE_API,
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json', // 默认请求头
    }, // 请求头
    withCredentials: true, // 是否携带cookie
    timeout: 1000 * 6, // 请求超时时间
})

// 字节流下载flag
let isBlob = false

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 根据请求头判断是否是字节流
        isBlob = config.responseType === 'blob'
        // 设置请求头, 添加 Token
        config.headers['Authorization'] = getToken()

        // 请求为表单
        if (config.contentType === 'form') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        // get 请求包含数组，参数进行序列化
        if (config.method === 'get' && config.params) {
            config.paramsSerializer = (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        }
        // 请求参数为空时，默认给一个空对象
        config.data = config.data || {}
        config.params = config.params || {}
        return config
    },
    (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 如果是字节流，直接抛出字节流，不走code验证
        if (isBlob) {
            return response
        }
        const res = response.data
        // 服务端未返回  200
        if (res.code !== 200) {
            ElMessage.error({
                message: res.msg || 'Error',
                type: 'error',
                duration: 3 * 1000,
            })

            // 401: 未登录; 403: token过期;
            if (res.code === 401) {
                ElMessage.confirm({
                    title: '登录过期',
                    message: '登录状态已过期，是否重新登录？',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    // 清除token
                    // localStorage.removeItem("token");
                    // localStorage.removeItem("userInfo");
                    // 跳转到登录页面
                    // window.location.href = "/login";
                    const router = useRouter()
                    router.push('/login')
                })
                return Promise.reject(
                    new Error(res.message || ' 登录过期 Error')
                )
            } else {
                return Promise.reject(new Error(res.msg || 'Error'))
            }
        } else {
            // 成功返回响应结果
            return res
        }
    },
    (error) => {
        // return Promise.reject(error);
        ElMessage({
            message: error.message || '网络异常，请稍后再试',
            type: 'error',
            duration: 3 * 1000,
        })
        return Promise.reject(error)
    }
)
