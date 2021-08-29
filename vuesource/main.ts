import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import https from './common/Services/request'
import { CommonUtil } from './common/Utils/Common'

const app = createApp(App)
app.use(installElementPlus).use(store).use(router).mount('#app')
app.config.globalProperties.$https = https
app.config.globalProperties.$CommonUtil = new CommonUtil()
