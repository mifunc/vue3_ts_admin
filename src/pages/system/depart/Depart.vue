<template>
  <div>
    <el-form  ref="form"  label-width="80px" :inline="true">
      <el-form-item class="deptInput">
        <el-input ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search">搜索</el-button>
        <el-button :icon="Plus" @click="show">新增</el-button>
      </el-form-item>
    </el-form>
    
    <el-table
      :data="tableData.list"
      style="width: 100%; margin-bottom: 20px"
      row-key="deptId"
      border
      default-expand-all
    >
      <el-table-column prop="deptName" label="部门名称" header-align="center"/>
      <el-table-column prop="phone" label="电话" align="center"/>
      <el-table-column prop="createTime" label="创建时间" align="center"/>
      <el-table-column label="操作" width='200' align="center">
          <template #default="scope">
             <el-button type="primary"  size="small" @click="editDept(scope.row)">编辑</el-button>
             <el-button type="danger" size="small">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
  <DepartAddAndEdit ref="addDeptRef" @save="save" :tableData="tableData"></DepartAddAndEdit>
</template>
<script setup lang='ts'>
import {Search,Plus} from '@element-plus/icons'
import useDeptTable from '@/composables/dept/useDeptTable'
import DepartAddAndEdit from './DepartAddAndEdit.vue';
import { ref } from 'vue';
import { AddDeptModel, DeptModel } from '@/api/dept/deptModel';
import { EditAddType } from '@/enums/baseEnum';
const {tableData}=useDeptTable()
const addDeptRef = ref<{show:(type:number,row?:DeptModel)=>void}>();
const show=()=>{
  addDeptRef.value?.show(EditAddType.ADD)
}
const save=(addDeptModel:AddDeptModel)=>{
  console.log(addDeptModel)
  
}
const editDept=(row:DeptModel)=>{
  addDeptRef.value?.show(EditAddType.EDIT,row)
}

</script>
<style scoped lang='scss'>
.deptInput{
  margin-right:15px;
}
</style>