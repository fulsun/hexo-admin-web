import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as loginApi, register as registerApi, logout as logoutApi, type LoginParams } from '@/api/userApi';

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  // 添加用户信息状态
  const userInfo = ref<any>(null); 


  const login = async (loginParams: LoginParams) => {
    try {
      const result = await loginApi(loginParams);
      // 提取响应数据
      const data = result.data;
      token.value = data.token;
      localStorage.setItem('token', data.token);
      // 存储用户信息
      userInfo.value = data; 
      return result;
    } catch (error) {
      // 处理错误
      throw error;
    }
  };

  const register = async (loginParams: LoginParams) => {
    try {
      const result = await registerApi(loginParams);
      return result;
    } catch (error) {
      throw error;
    }
  }

  const logout = () => {
    token.value = null;
    localStorage.removeItem('token');
    userInfo.value = null; // 清空用户信息
    // 清理服务器端的token
    logoutApi();
  };



  return {
    token,
    userInfo, // 添加用户信息返回值
    login,
    register,
    logout
  };
});