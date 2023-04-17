import { createApp } from 'vue'
import '@csstools/normalize.css'
// 注册图标
import 'virtual:svg-icons-register'
// Toast
import 'vant/es/toast/style'
// Dialog
import 'vant/es/dialog/style'
// Notify
import 'vant/es/notify/style'
// ImagePreview
import 'vant/es/image-preview/style'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import './assets/styles/index.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
