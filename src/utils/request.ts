import axios from 'axios';
import { message } from 'ant-design-vue';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.success === true) {
      // 处理成功响应
      return data;
    }
    return Promise.reject(new Error(data.message || '请求失败'));
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 封装请求方法
const request = {
  get(url: string, params?: any) {
      return service.get(url, { params });
  },
  post(url: string, data?: any) {
      return service.post(url, data);
  },
  put(url: string, data?: any) {
      return service.put(url, data);
  },
  delete(url: string, params?: any) {
      return service.delete(url, { params });
  }
};

export default request; 