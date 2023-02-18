import { createApp,createVNode } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {store,key} from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
const app=createApp(App)

app.use(router).use(store,key).use(ElementPlus).mount('#app')

const Icon = (props: { icon: string }) => {
    const { icon } = props;
    return createVNode(Icons[icon as keyof typeof Icons]);
};
app.component('Icon', Icon);