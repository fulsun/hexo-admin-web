import { ref } from 'vue';

// 定义一个响应式变量来存储用户的登录状态
export const isLoggedIn = ref(false);

// 模拟登录操作
export const login = () => {
  isLoggedIn.value = true;
};

// 模拟登出操作
export const logout = () => {
  isLoggedIn.value = false;
};