import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as loginApi, logout as logoutApi, getUserInfo, type LoginParams, type LoginResult } from '@/api/userApi';

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const userInfo = ref<LoginResult['userInfo'] | null>(null);

  const login = async (loginParams: LoginParams) => {
    try {
      const result = await loginApi(loginParams);
      // 提取响应数据
      const data: LoginResult = result.data; 
      token.value = data.token;
      userInfo.value = data.userInfo;
      localStorage.setItem('token', data.token);
      return result;
    } catch (error) {
      // 处理错误
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      token.value = null;
      userInfo.value = null;
      localStorage.removeItem('token');
    } catch (error) {
      throw error;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const result = await getUserInfo();
      userInfo.value = result.data?.userInfo;
    } catch (error) {
      throw error;
    }
  };

  return {
    token,
    userInfo,
    login,
    logout,
    fetchUserInfo
  };
});