import { createApp } from 'vue'
import '@/utils/request'
import ArcoVue from '@arco-design/web-vue'
// attention import css sort
// arco component css has normalize css so doesn't need in this project
import '@arco-design/web-vue/dist/arco.css'
import './assets/style/index.scss'
import App from './App'
import i18n from './locale'
import pinia from '@/store'
import router from '@/router'
import { configRouteGuard } from '@/router/guard'

import ArcoVueIcon from '@arco-design/web-vue/es/icon'


const app = createApp(App)

app.use(ArcoVueIcon)
app.use(ArcoVue)

app.use(i18n)
app.use(pinia)
app.use(router)

// 在 pinia 和 router 都准备好之后，再配置路由守卫
configRouteGuard(router)

app.mount('#app')
