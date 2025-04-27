<template>
  <a-layout class="login-layout">
    <a-layout-content class="login-content">
      <div class="login-box">
        <div class="login-logo">
          <img src="@/assets/logo.png" alt="Logo" />
          <h1>后台管理系统</h1>
        </div>
        <a-form :model="formData" name="loginForm" @finish="handleLogin" class="login-form" :rules="rules">
          <a-form-item name="telephone">
            <a-input v-model:value="formData.telephone">
              <template #prefix>
                <UserOutlined />
              </template>
              <template #placeholder>请输入手机号</template>
            </a-input>
          </a-form-item>
          <a-form-item name="password">
            <a-input-password v-model:value="formData.password">
              <template #prefix>
                <LockOutlined />
              </template>
              <template #placeholder>请输入密码</template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="remember">
            <a-checkbox v-model:checked="formData.remember">记住我</a-checkbox>
            <a style="float: right" href="#">忘记密码?</a>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block class="login-button">
              登录
            </a-button>
            <p class="register-tip">
              还没有账号? <router-link to="/register">立即注册</router-link>
            </p>
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/store/user';

const router = useRouter();
const userStore = useUserStore();

const formData = ref({
  telephone: '',
  password: '',
  remember: true
});

const rules = {
  telephone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '不支持的手机号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, message: '密码长度不能小于5位', trigger: 'blur' }
  ]
};

const handleLogin = async (values: any) => {
  try {
    await userStore.login({
      telephone: values.telephone,
      password: values.password,
      remember: values.remember
    });
    message.success('登录成功');
    router.push('/');
  } catch (error: any) {
    // 直接使用 error 作为响应对象
    if (error && error.data && error.data.success === false) {
      const {  message: errorMessage } = error.data;
        message.error(errorMessage || '登录失败，请稍后重试');
    } else {
      message.error('登录失败，请联系管理员');
    }
  }
};
</script>

<style scoped>
.login-layout {
  /* 使用柔和的背景渐变 */
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-box {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 400px;
  margin: 0 auto;
  /* 增加过渡效果，使交互更柔和 */
  transition: all 0.3s ease;
}

.login-box:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.login-logo {
  text-align: center;
  margin-bottom: 30px;
}

.login-logo img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.login-logo h1 {
  font-size: 24px;
  color: #333;
}

.login-form {
  width: 100%;
}

.login-button {
  margin-top: 20px;
  /* 按钮使用柔和的颜色 */
  background-color: #26c6da;
  border-color: #26c6da;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #00acc1;
  border-color: #00acc1;
}

.register-tip {
  text-align: center;
  margin-top: 15px;
}
</style>