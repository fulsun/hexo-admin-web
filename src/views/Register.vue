<template>
  <a-layout class="register-layout">
    <a-layout-content class="register-content">
      <div class="register-box">
        <div class="register-logo">
          <img src="@/assets/logo.png" alt="Logo" />
          <h1>后台管理系统 - 注册</h1>
        </div>
        <a-form :model="formData" name="registerForm" @finish="handleRegister" class="register-form" :rules="rules">
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
          <a-form-item name="confirmPassword">
            <a-input-password v-model:value="formData.confirmPassword">
              <template #prefix>
                <LockOutlined />
              </template>
              <template #placeholder>请再次输入密码</template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block class="register-button">
              注册
            </a-button>
            <p class="login-tip">
              已有账号? <a href="" @click.prevent="goToLogin">立即登录</a>
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
  confirmPassword: ''
});

const rules = {
  telephone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '不支持的手机号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, message: '密码长度不能小于5位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (_: unknown, value: string) => {
        if (!value || formData.value.password === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('两次输入的密码不一致'));
      },
      trigger: 'blur'
    }
  ]
};

const handleRegister = async (values: any) => {
  try {
    // 由于 result 变量声明后未使用，直接调用 userStore.register 方法
    await userStore.register({
      telephone: values.telephone,
      password: values.password
    });
    message.success('注册成功，请登录');
    router.push('/login');
  } catch (error: any) {
    // 直接使用 error 作为响应对象
    if (error && error.data && error.data.success === false) {
      const { code, message: errorMessage } = error.data;
      switch (code) {
        case 'USER_EXIST':
          message.error('用户已存在，请直接登录或使用其他手机号注册');
          break;
        default:
          message.error(errorMessage || '注册失败，请稍后重试');
      }
    } else {
      message.error('注册失败，请稍后重试');
    }
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.register-layout {
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.register-box {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 400px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.register-box:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.register-logo {
  text-align: center;
  margin-bottom: 30px;
}

.register-logo img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.register-logo h1 {
  font-size: 24px;
  color: #333;
}

.register-form {
  width: 100%;
}

.register-button {
  margin-top: 20px;
  background-color: #26c6da;
  border-color: #26c6da;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #00acc1;
  border-color: #00acc1;
}

.login-tip {
  text-align: center;
  margin-top: 15px;
}
</style>