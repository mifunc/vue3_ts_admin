<template>
 <el-icon class="icons" @click="changeCollapse">
    <component :is="status ? Fold : Expand"></component>
 </el-icon>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import {useStore} from '@/store'
import {Fold,Expand} from '@element-plus/icons'
const store=useStore()
const status = computed(()=>{
  return store.getters['menus/getCollapse']
})
const changeCollapse=()=>{
  store.commit('menus/setCollapse', !status.value)
}
</script>
<style lang="scss" scoped>
.icons{
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #303133;
  cursor: pointer;
  margin-right:10px;
}
</style>