import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Axios from 'axios'
import 'element-plus/dist/index.css'

import { Request } from './modules/utils/AxiosUtils'
import VueAxios from 'vue-axios'
import * as ElementIcons from '@element-plus/icons-vue'
import App from './App.vue'
import router from './modules/routers/routes'

const app=createApp(App)
for(const name in ElementIcons){
    app.component(name ,(ElementIcons as any)[name])
}
app.use(ElementPlus,Axios).use(VueAxios, Request.init()).use(router)
app.mount('#app')