import { getMenuListApi } from "@/api/menu/menu"
import { RouteRecordRaw } from "vue-router"
import { ActionContext } from "vuex"
import { RootState } from ".."
import Layout from '@/layout/Index.vue'
const modules = import.meta.glob('../../pages/**/*.vue')

export type MenusState={
    collapse:boolean,
    menuList:any,
    loadMenu:boolean
}

export const state:MenusState={
    collapse:false,
    menuList:[
        {
            path:'/',
            component:()=>'Layout',
            meta:{
              title:'首页',
              icon:'House',
            },
            children:[]
        }
    ],
    loadMenu:false
}

export const mutations={
    setCollapse(state:MenusState,collapse:boolean){
        state.collapse=collapse
    },
    setMenuList(state:MenusState,menuList:Array<RouteRecordRaw>){
        state.menuList = state.menuList.concat(menuList)
    },
    setLoadMenu(state:MenusState,loadMenu:boolean){
        state.loadMenu=loadMenu
    }
}

export const actions={
    getMenuList({commit}:ActionContext<MenusState,RootState>){
        return new Promise((resolve,reject)=>{
            let allRoutes: any;
             getMenuListApi().then(res=>{
                
                if(res.code==0){
                    allRoutes = filterAsyncRoutes(res.data);
                    commit('setMenuList', allRoutes)
                    commit('setLoadMenu', true)
                }
                resolve(allRoutes)
             }).catch(error=>{
                reject(error)
             })
        })

    }
    

}

export function filterAsyncRoutes(routes: RouteRecordRaw[]) {

    return routes.filter((route: any) => {
        if (route.component == 'Layout') {
            route.component = Layout
        } else {
            route.path = `${route.path}`
            route.component = modules[`../../pages/${route.component}.vue`]
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRoutes(route.children);
        }
        return true;
    })
}


export const getters={
    getCollapse(state:MenusState){
        return state.collapse
    },
    getMenuList(state:MenusState){
        return state.menuList
    },
    getLoadMenu(state:MenusState){
        return state.loadMenu
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}