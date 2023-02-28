import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import {getToken} from '@/utils/auth'
import {store} from '@/store'

export const constantRoutes:Array<RouteRecordRaw>=[
  {
    path:'/',
    component:()=>import('@/layout/Index.vue'),
    meta:{
      title:'首页',
      icon:'House',
    }
  },{
    path:'/login',
    component:()=>import('@/pages/login/Login.vue'),
    meta:{
      title:'登录',
      icon:'ChatRound'
    }
  }
]

// const routes:Array<RouteRecordRaw>=[
//     {
//         path:'/',
//         component:()=>Layout,
//         meta:{
//           title:'首页',
//           icon:'House',
//         }
//       },
//       {
//         path:'/system',
//         component:Layout,
//         meta:{
//           title:"系统管理",
//           icon:'House',
//         },
//         children:[
//            {
//             path:'depart',
//             component:()=>import('@/pages/system/Depart.vue'),
//             name:'depart',
//             meta:{
//               title:'部门管理',
//               icon:'CirclePlus'
//             }
//            },
//            {
//             path:'user',
//             component:()=>import('@/pages/system/User.vue'),
//             name:'user',
//             meta:{
//               title:'用户管理',
//               icon:'User'
//             }
//            }
//         ]
//       },
//       {
//         path:'/message',
//         component:Layout,
//         meta:{
//           title:'消息中心',
//           icon:'ChatRound',
//         },
//         children:[
//           {
//             path:'manage',
//             component:()=>import('@/pages/message/Manage.vue'),
//             name:'manage',
//             meta:{
//               title:'消息管理',
//               icon:'ChatLineRound'
//             }
//           }
//         ]
//       },
//       {
//         path:'/login',
//         component:()=>import('@/pages/login/Login.vue'),
//         meta:{
//           title:'登录',
//           icon:'ChatRound'
//         }
//       }
// ]
const router=createRouter({
    history:createWebHistory(),
    routes:constantRoutes
})
router.beforeEach(async(to, from, next) => {
  const token=getToken()
  if (to.path !== '/login' && !token) {
    next({ path: '/login' })
  }else{ 
    const loadMenu=store.getters['menus/getLoadMenu']
    if(loadMenu){
      next()
    }else{
      try{
        await store.dispatch('menus/getMenuList').then((res)=>{
          [...res].forEach(item => {
            router.addRoute(item)
          });
          next({ ...to, replace: true })          
        })
      }catch(error){
        console.log(error)
        next({ path: '/login' })
      }
    }
   
  }
})


export default router