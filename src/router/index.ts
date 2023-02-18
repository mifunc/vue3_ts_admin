import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import Layout from '@/layout/Index.vue'

const routes:Array<RouteRecordRaw>=[
    {
        path:'/',
        component:()=>Layout,
        meta:{
          title:'首页',
          icon:'House',
        }
      },
      {
        path:'/system',
        component:Layout,
        meta:{
          title:"系统管理",
          icon:'House',
        },
        children:[
           {
            path:'depart',
            component:()=>import('@/pages/system/Depart.vue'),
            name:'depart',
            meta:{
              title:'部门管理',
              icon:'CirclePlus'
            }
           },
           {
            path:'user',
            component:()=>import('@/pages/system/User.vue'),
            name:'user',
            meta:{
              title:'用户管理',
              icon:'User'
            }
           }
        ]
      },
      {
        path:'/message',
        component:Layout,
        meta:{
          title:'消息中心',
          icon:'ChatRound',
        },
        children:[
          {
            path:'manage',
            component:()=>import('@/pages/message/Manage.vue'),
            name:'manage',
            meta:{
              title:'消息管理',
              icon:'ChatLineRound'
            }
          }
        ]
      },
      {
        path:'/login',
        component:()=>import('@/pages/login/Login.vue'),
        meta:{
          title:'登录',
          icon:'ChatRound'
        }
      }
]

const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router