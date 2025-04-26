import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as loginApi, register as registerApi, type LoginParams } from '@/api/userApi';

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'));

  const login = async (loginParams: LoginParams) => {
    try {
      const result = await loginApi(loginParams);
      // 提取响应数据
      const data = result.data;
      token.value = data.token;
      localStorage.setItem('token', data.token);
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



  return {
    token,
    login,
    register
  };
});