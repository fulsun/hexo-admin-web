import axios from 'axios';

// 创建新的 axios 对象
const _axios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL
});

// 添加请求拦截器
_axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 统一添加请求头
    config.headers.Authorization = localStorage.getItem('token') || '';
    return config;
}, (error) => { // 请求出错时的处理
    return Promise.reject(error)
})

// 添加响应拦截器
_axios.interceptors.response.use(function (response) {
    // 端返回的响应状态码总是200，用自定义错误码表示出错, 统一处理
    if (response.data.code === 200) {
        return response
    } else if (response.data.code === 401) {
        // 401 表示未登录，跳转到登录页
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return response;
}, function (error) {
    // 对响应错误做点什么

    console.error(error) // 处理了异常
    return Promise.reject(error);
});
export default _axios
