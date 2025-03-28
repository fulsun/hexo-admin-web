<template>
  <a-layout class="layout">
    <!-- 侧边栏 -->
    <a-layout-sider :collapsible="true" :collapsed="collapsed" @collapse="onCollapse" class="sider">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
        <span v-show="!collapsed">后台管理</span>
      </div>
      <a-menu mode="inline" :default-selected-keys="['1']" @select="onMenuSelect" theme="dark">
        <a-menu-item key="1">
          <template #icon>
            <DashboardOutlined />
          </template>
          仪表盘
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <UserOutlined />
          </template>
          用户管理
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <SettingOutlined />
          </template>
          设置
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 主体内容 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="header">
        <a-icon :component="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" @click="toggle" class="trigger" />
        <div class="header-right">
          <a-dropdown>
            <a class="user-dropdown">
              {{ username }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0">
                  <UserOutlined /> 个人信息
                </a-menu-item>
                <a-menu-item key="1" @click="handleLogout">
                  <LogoutOutlined /> 退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <!-- 内容区域 -->
      <a-layout-content class="content">
        <div class="content-wrapper">
          <h1>欢迎来到后台管理系统</h1>
          <p>这里是后台管理系统的首页，你可以在此进行各种操作。</p>
        </div>
      </a-layout-content>
      <!-- 底部 -->
      <a-layout-footer class="footer">
        版权所有 &copy; 2025 后台管理系统
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';
import { useUserStore } from '@/store/user';

const router = useRouter();
const collapsed = ref(false);
const userStore = useUserStore();
const username = userStore.userInfo?.username ?? '';

const toggle = () => {
  collapsed.value = !collapsed.value;
};

const onCollapse = (isCollapsed: boolean) => {
  collapsed.value = isCollapsed;
};

const onMenuSelect = ({ key }: { key: string }) => {
  console.log('选中菜单项:', key);
  // 这里可以根据key进行路由跳转
};

const handleLogout = () => {
  // 清除用户信息
  userStore.logout();
  // 跳转到登录页面
  router.push('/login');
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.sider {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
}

.logo {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  overflow: hidden;
}

.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.logo span {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}

.header {
  background: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
}

.trigger {
  font-size: 18px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  color: rgba(0, 0, 0, 0.45);
}

.trigger:hover {
  color: #1890ff;
}

.header-right {
  padding-right: 24px;
}

.user-dropdown {
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.content {
  margin: 24px 16px;
  padding: 24px;
  background: #f0f2f5;
  min-height: 280px;
}

.content-wrapper {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.content-wrapper h1 {
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
}

.content-wrapper p {
  color: rgba(0, 0, 0, 0.45);
  line-height: 1.5;
}

.footer {
  text-align: center;
  background: #f0f2f5;
  padding: 16px 50px;
  color: rgba(0, 0, 0, 0.45);
}

:deep(.ant-menu-item) {
  margin: 4px 0;
}

:deep(.ant-menu-item-selected) {
  background-color: #1890ff !important;
}

:deep(.ant-menu-item:hover) {
  background-color: rgba(24, 144, 255, 0.1) !important;
}
</style>