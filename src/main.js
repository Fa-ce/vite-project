import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import plugins from './plugins'
import pinia from 'pinia'
import router from './router'
// 路由校验
import './permissions'

createApp(App).use(pinia).use(router).use(plugins).mount('#app')
