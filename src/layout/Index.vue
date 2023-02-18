<template>
<el-container class="layout">
    <el-aside class="sider" width="auto">
        <MenuBar/>
    </el-aside>
    <el-container class="layout">
        <el-header class="header">
            <Header/>
        </el-header>
        <el-main class="main">
            <Tabs/>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script setup lang="ts">
import MenuBar from '@/layout/menu/MenuBar.vue'
import Header from '@/layout/header/Header.vue'
import Tabs from '@/layout/tabs/Tabs.vue'
</script>

<style  lang="scss">
.layout{
   height: 100%;
   .sider{
   
   }
   .header{
    height: 50px;
    text-align: left;
    display: flex;
    align-items: center;
   }
   .main{
    padding: 5px;
    text-align: left;
   }

}
</style>