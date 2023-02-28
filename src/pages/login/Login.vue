<template>
  <div class="container">

    <el-form  :model="formModel" ref="loginFormRef" :rules="rules" class="loginForm" label-position="top" size="large">
        <el-form-item>
                <div class="loginTitle">系统登录</div>
        </el-form-item>
        <el-form-item  prop="username">
            <el-input placeholder="请输入账号" v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item   prop="password">
            <el-input placeholder="请输入密码" v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="login" class="loginBtn">登录</el-button>
        </el-form-item>
    </el-form>
    
  </div>
</template>
<script setup lang='ts'>

import userLoginModel from '@/composables/user/userLoginModel'
import userLogin from '@/composables/user/userLogin'

const {loginFormRef,formModel,rules} =userLoginModel()
const {login}=userLogin(formModel)




</script>
<style scoped lang='scss'>
.container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .loginTitle{
      font-size: 20px;
    }
    .loginForm{
        width:300px;
        background: #fff;
        padding: 50px 30px;
        border: 1px dashed #ccc;
    }
    .loginBtn{
        width: 100%;
    }
}

</style>