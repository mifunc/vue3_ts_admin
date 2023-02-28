<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path:item.path }"  v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </template>
<script setup lang='ts'>
import {ref,watch,Ref} from 'vue'
import {useRoute,RouteLocationMatched} from 'vue-router'
const tabs:Ref<RouteLocationMatched[]> = ref([])
const route=useRoute()
const getBred=()=>{
    let mached=route.matched.filter(item=>item.meta&&item.meta.title)
    const first=mached[0]
    if(first&&first.path!=='/'){
      mached=[{path:'/',meta:{title:'首页'}} as any ].concat(mached)
    }
    tabs.value=mached
}
getBred()
watch(()=>route.path,()=>getBred())
</script>
<style scoped lang='scss'>
</style>