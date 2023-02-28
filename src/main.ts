import { createApp,createVNode } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {store,key} from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import {objCoppy} from '@/utils/tool'
const app=createApp(App)

app.use(router).use(store,key).use(ElementPlus).mount('#app')
app.config.globalProperties.$objCoppy=objCoppy
const Icon = (props: { icon: string }) => {
    const { icon } = props;
    return createVNode(Icons[icon as keyof typeof Icons]);
};
app.component('Icon', Icon);