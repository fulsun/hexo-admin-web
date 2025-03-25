import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import router from './router'


createApp(App).use(antd).use(router).mount('#app')
