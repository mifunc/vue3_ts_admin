<template>
  <div class="container">
    <el-form :model="formModel" ref="form" :rules="rules" class="loginForm" label-position="top" size="large">
        <el-form-item label="账号" prop="username">
            <el-input  v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
            <el-input  v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="onSubmit" class="loginBtn">登录</el-button>
        </el-form-item>
    </el-form>
    
  </div>
</template>
<script setup lang='ts'>
import { reactive} from 'vue'
const formModel=reactive({
    username:'',
    password:''
})
const rules=reactive({
    username:[
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 5, max: 10, message: '账号的长度在5到10之间', trigger: 'blur' },
    ],
    password:[
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, max: 15, message: '密码的长度在8到15之间', trigger: 'blur' },
    ]
})
const onSubmit=()=>{

}
</script>
<style scoped lang='scss'>
.container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .loginForm{
        width:300px;
        background: #fff;
        padding: 50px 30px;
        box-shadow: 0 21px 41px 0 rgb(0 0 0 / 20%);
    }
    .loginBtn{
        width: 100%;
    }
}

</style>