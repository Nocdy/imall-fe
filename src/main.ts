import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Axios from 'axios'
import 'element-plus/dist/index.css'
import * as ElementIcons from '@element-plus/icons-vue'
import App from './App.vue'

const app=createApp(App)
for(const name in ElementIcons){
    app.component(name ,(ElementIcons as any)[name])
}
app.use(ElementPlus,Axios)
app.mount('#app')