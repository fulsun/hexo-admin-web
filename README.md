# 后台管理系统项目文档
后端项目地址：https://github.com/fulsun/hexo-admin

## 一、项目概述
本项目是一个基于 Vue 3 + TypeScript + Vite 的后台管理系统，使用了 Ant Design Vue 组件库，集成了 Pinia 状态管理和 Vue Router 路由管理，实现了用户登录、用户信息管理和页面导航等功能。同时，项目通过 Axios 与后端进行数据交互，并处理了登录验证、错误处理等逻辑。

## 二、项目结构
```
hexo-admin-web/
├── .gitignore              # Git 忽略文件配置
├── .vscode/                # VSCode 配置
│   └── extensions.json     # 推荐的 VSCode 扩展
├── src/                    # 源代码目录
│   ├── api/                # API 请求相关代码
│   │   ├── userApi.ts      # 用户相关 API
│   │   └── request.ts      # 请求封装
│   ├── assets/             # 静态资源
│   ├── components/         # 组件目录
│   │   └── Navigation.vue  # 导航组件
│   ├── model/              # 数据模型定义
│   │   ├── SpringRes.ts    # Spring 响应数据模型
│   │   └── Student.ts      # 学生数据模型
│   ├── router/             # 路由配置
│   │   └── index.ts        # 路由配置文件
│   ├── store/              # 状态管理
│   │   └── user.ts         # 用户状态管理
│   ├── utils/              # 工具函数
│   │   └── request.ts      # 请求工具函数
│   ├── views/              # 视图组件
│   │   ├── Login.vue       # 登录页面
│   │   └── Home.vue        # 主页
│   ├── App.vue             # 根组件
│   ├── env.d.ts            # 环境变量类型定义
│   ├── main.ts             # 入口文件
│   └── style.css           # 全局样式
├── .npmrc                  # npm 配置文件
├── package.json            # 项目依赖和脚本配置
├── pnpm-lock.yaml          # pnpm 依赖锁定文件
├── tsconfig.json           # TypeScript 配置
├── tsconfig.app.json       # 应用 TypeScript 配置
├── tsconfig.node.json      # Node.js TypeScript 配置
├── vite.config.ts          # Vite 配置文件
└── index.html              # 入口 HTML 文件
```

## 三、技术栈
- **前端框架**：Vue 3
- **状态管理**：Pinia
- **路由管理**：Vue Router 4
- **组件库**：Ant Design Vue
- **构建工具**：Vite
- **类型检查**：TypeScript
- **HTTP 请求**：Axios

## 四、环境准备
- **Node.js**：版本 >= 14.17
- **pnpm**：推荐使用 pnpm 进行包管理

## 五、安装与启动
1. **克隆项目**
```bash
git clone https://github.com/fulsun/hexo-admin.git
cd hexo-admin-web
```
2. **安装依赖**
```bash
pnpm install
```
3. **启动开发服务器**
```bash
pnpm dev
```
4. **打包项目**
```bash
pnpm build
```
5. **预览打包后的项目**
```bash
pnpm preview
```

## 六、接口文档

### 1. 用户登录
- **接口地址**：`/login`
- **请求方法**：`POST`
- **请求参数**：
```typescript
{
  username: string;
  password: string;
}
```
- **响应数据**：
```typescript
{
  token: string;
  userInfo: {
    id: number;
    username: string;
    nickname: string;
    avatar?: string;
  };
}
```

### 2. 用户退出登录
- **接口地址**：`/logout`
- **请求方法**：`POST`
- **请求参数**：无
- **响应数据**：无

### 3. 获取用户信息
- **接口地址**：`/user/info`
- **请求方法**：`GET`
- **请求参数**：无
- **响应数据**：
```typescript
{
  token: string;
  userInfo: {
    id: number;
    username: string;
    nickname: string;
    avatar?: string;
  };
}
```

## 七、路由配置
- **登录页面**：`/login`
- **主页**：`/`，需要登录才能访问

## 八、状态管理
使用 Pinia 进行状态管理，用户状态管理模块 `user.ts` 提供了以下方法：
- `login`：用户登录
- `logout`：用户退出登录
- `fetchUserInfo`：获取用户信息

## 九、请求封装
在 `src/utils/request.ts` 中封装了 Axios 请求，添加了请求拦截器和响应拦截器，处理了请求头添加和错误处理逻辑。

## 十、注意事项
- 请确保在 `.env` 文件中配置了 `VITE_BACKEND_API_BASE_URL` 环境变量，用于指定后端 API 的基础地址。
- 项目中使用了 TypeScript 进行类型检查，请确保代码的类型定义正确。

## 十一、贡献指南
如果你想为项目做出贡献，请遵循以下步骤：
1. Fork 项目到你的 GitHub 仓库。
2. 创建一个新的分支进行开发。
3. 提交代码并发起 Pull Request。

## 十二、许可证
本项目采用 [MIT 许可证](LICENSE)。