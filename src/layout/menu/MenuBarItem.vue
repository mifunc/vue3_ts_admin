<template>
   <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length>0" :index="menu.path">
      <template #title>
        <!-- <i :class="menu.meta.icon"></i> -->
        <el-icon>
         <Icon class="icons" :icon='menu.meta.icon'></Icon>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <MenuBarItem :menuList="menu.children" :parent="menu.path"/>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
        <!-- <i :class="menu.meta.icon"></i> -->
        <Icon class="icons" :icon='menu.meta.icon'></Icon>
        <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
   </template>
</template>
<script setup lang="ts">
defineProps(["menuList","parent"])
</script>
<style>
.icons{
    width: 24px;
    height: 18px;
    margin-right: 5px;
}
</style>