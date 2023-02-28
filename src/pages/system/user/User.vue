<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="180px">
        <UserSide @nodeClick="nodeClick"/>
      </el-aside>
      <el-main>
        <el-form :model="params" ref="form"  label-width="100px" :inline="true" size="normal">
          <el-form-item label="">
            <el-input v-model="params.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" size="default" @click="search">搜索</el-button>
            <el-button :icon="Close" size="default">重置</el-button>
            <el-button :icon="Plus" size="default">添加</el-button>
            
          </el-form-item>
        </el-form>
        
        <el-table :data="tableData.list" style="width: 100%" border>
          <el-table-column fixed prop="userId" label="用户ID" width="100" header-align="center" align="center"/>
          <el-table-column prop="deptId" label="部门" width="100"  header-align="center" align="center"/>
          <el-table-column prop="userName" label="用户账号" width="100"  header-align="center" align="center"/>
          <el-table-column prop="nickName" label="用户昵称" width="100"  header-align="center" align="center"/>
          <el-table-column prop="email" label="Email" width="150"  header-align="center" align="center"/>
          <el-table-column prop="createTime" label="创建时间" width="180"  header-align="center" align="center"/>
          <el-table-column fixed="right" label="操作" width="150"  header-align="center" align="center">
            <template #default>
              <el-button :icon="MoreFilled"  size="small" @click="userDetail">详情</el-button>
              <el-button :icon="Edit"  size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination background layout="prev, pager, next" 
          :hide-on-single-page="tableData.pagination.page<=1"
          :total="tableData.pagination.totalCount" 
          :page-sizes="[10, 20, 40, 80, 100]"
          :page-size="tableData.pagination.pageSize"
          @current-change="currentChange"
        ></el-pagination>

      </el-main>
    </el-container>
  </div>
</template>
<script setup lang='ts'>
import {Search,Close,Plus,Edit,MoreFilled} from '@element-plus/icons'
import UserSide from '@/composables/user/UserSide.vue'
import useUser from '@/composables/user/useUser' 
const {tableData,userDetail,nodeClick,currentChange,params,search}=useUser()

</script>
<style scoped lang='scss'>
.el-main{
  padding: 0;
}

.el-pagination{
  margin-top:10px;
}
.el-form--inline .el-form-item{
  margin-right: 10px;
}
</style>