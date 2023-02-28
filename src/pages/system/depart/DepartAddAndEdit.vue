<template>
     <SysDialog
       :title="dialog.title"
       :visible="dialog.visible"
       :width="dialog.width"
       :height="dialog.height"
       @onClose="onClose"
       @onConfirm="confirm"
     >
        <template v-slot:content>
            <el-form :model="dialogModel" ref="addDeptForm" :rules="rules" label-width="80px" :inline="false" size="small">
                <el-row>
                <el-col :span="12" :offset="0">
                    <el-form-item label="上级部门" size="default" prop="parentName">
                        <el-input v-model="dialogModel.ancestors" type="hidden" size="default" clearable></el-input>
                        <el-input v-model="dialogModel.parentId" type="hidden" size="default" clearable></el-input>
                        <el-input v-model="dialogModel.parentName"  size="default" clearable @click="selectParent"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="部门名称" size="default" prop="deptName">
                        <el-input v-model="dialogModel.deptName"  placeholder="" size="default" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="排序" size="default" prop="orderNum">
                        <el-input v-model="dialogModel.orderNum"  size="default" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="负责人" size="default" prop="leader">
                        <el-input v-model="dialogModel.leader"  placeholder="" size="default" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="手机" size="default" prop="phone">
                        <el-input v-model="dialogModel.phone"  size="default" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="邮箱" size="default" prop="email">
                        <el-input v-model="dialogModel.email"  placeholder="" size="default" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form>
        </template>
     </SysDialog>
     <DeptDialog ref="deptDialogRef" @select="select"></DeptDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import useDeptModel from '@/composables/dept/useDeptModel'
import DeptDialog from '@/composables/dept/DeptDialog.vue'
import { ref } from 'vue';
import { DeptModel, SelectdNode } from '@/api/dept/deptModel';
import { DialogTitle, EditAddType } from '@/enums/baseEnum';
import useInstance from '@/hooks/useInstance'
const {dialog,onShow,onClose}=useDialog()
const {dialogModel,rules,addDeptForm}=useDeptModel()
const {global}=useInstance()
const emit=defineEmits(['save'])
const prop=defineProps(['tableData'])
const show=(type:number,row?:DeptModel)=>{
    dialog.title=type==EditAddType.ADD?DialogTitle.ADD:DialogTitle.EDIT
    dialog.width=600
    dialog.height=150
    if(type==EditAddType.EDIT&&row){
        global.$objCoppy(row,dialogModel)
        if(row.parentId==0){
            dialogModel.parentName="顶级部门"
        }else{
            const item=getParentItem(row.parentId,prop.tableData.list)
            if(item){
                dialogModel.parentName=item.deptName
            }
        }
       
       
    }
    onShow()
}
const getParentItem=(parentId:number,obj:any)=>{
    let result:any
    for(var i=0;i<obj.length;i++){
        var item=obj[i]
        if(item.deptId==parentId){
            result= item
            break
        }
        if(item.children){
            let res:any=getParentItem(parentId,item.children)
            if(res){
                return res
            }
        }
    }
    
    return result
}

const confirm=()=>{
    addDeptForm.value?.validate((valid)=>{
       if(valid){
        emit('save',dialogModel)
        onClose()
       }
    })

}
defineExpose({
    show
})
const deptDialogRef=ref<{show:()=>void}>()
const selectParent=()=>{
    deptDialogRef.value?.show()
}
const select=(data:SelectdNode)=>{
    dialogModel.ancestors=data.ancestors
    dialogModel.deptId=data.parentId
    dialogModel.parentName=data.deptName
}

</script>
<style scoped lang='scss'>
</style>
