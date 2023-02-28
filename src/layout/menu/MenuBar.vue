<template>
  <MenuLogo v-if="!isCollapse" class="layout-logo"/>
  <el-menu
    :default-active="activeIndex"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
  <MenuBarItem :menuList="menuList" parent=""/>
  </el-menu>
</template>

<script lang="ts" setup>

import {computed } from 'vue'
import {useStore} from '@/store/index'
import {useRoute} from 'vue-router'

import MenuBarItem from '@/layout/menu/MenuBarItem.vue'
import MenuLogo from '@/layout/menu/MenuLogo.vue'

const route=useRoute()
const store=useStore()

const activeIndex=computed(()=>{
  const {path}=route
  return path
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const isCollapse=computed(()=>{
  return store.getters['menus/getCollapse']
});
const menuList=computed(()=>{
  return store.getters['menus/getMenuList']
})
// const menuList=reactive([
//   {
//     path:'/',
//     component:'Layout',
//     meta:{
//       title:'首页',
//       icon:'House',
//     }
//   },
//   {
//     path:'/system',
//     component:'Layout',
//     meta:{
//       title:"系统管理",
//       icon:'House',
//     },
//     children:[
//        {
//         path:'depart',
//         component:'Layout',
//         name:'depart',
//         meta:{
//           title:'部门管理',
//           icon:'CirclePlus'
//         }
//        },
//        {
//         path:'user',
//         component:'Layout',
//         name:'user',
//         meta:{
//           title:'用户管理',
//           icon:'User'
//         }
//        }
//     ]
//   },
//   {
//     path:'/message',
//     component:'layout',
//     meta:{
//       title:'消息中心',
//       icon:'ChatRound',
//     },
//     children:[
//       {
//         path:'manage',
//         component:'Layout',
//         name:'manage',
//         meta:{
//           title:'消息管理',
//           icon:'ChatLineRound'
//         }
//       }
//     ]
//   }

// ])
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 100%;
}
.el-menu{
  height: 100%;
  border: none !important;
  .el-menu--inline li{
    background-color: #1f2d3d !important;
    box-shadow: 0px 0px 1px #ccc;
  }
  .el-menu-item{
    width:200px;
  }
}
@keyframes logoAnimation {
    0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1);
	}
	100% {
		transform: scale(1);
	}
}
.layout-logo {
    animation: logoAnimation 1s ease-out;
}

</style> 
