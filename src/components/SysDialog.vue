<template>
    <el-dialog
        custom-class="dialog-title"
        :title="title"
        :model-value="visible"
        :before-close="onClose"
        append-to-body
        :width="width+'px'"
        draggable
        >
        <div class="container" :style="{height:height+'px'}">
           <slot name="content"></slot>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onClose">取消</el-button>
                <el-button type="primary" @click="onConfirm">确定</el-button>
            </div>
        </template>
    </el-dialog>
    
</template>
<script setup lang="ts">
const props=defineProps({
    title:{
        type:String,
        default:"标题"
    },
    visible:{
        type:Boolean,
        default:false

    },
    width:{
        type:Number,
        default:600

    },
    height:{
        type:Number,
        default:250
    }
})
const emit=defineEmits(['onClose','onConfirm'])

const onClose=()=>{
    emit('onClose')
}
const onConfirm=()=>{
    emit('onConfirm')
}
</script>
<style lang="scss">
.dialog-title .el-dialog__header {
   background-color: #42b983;
   margin-right: 0px;
   .el-dialog__title, .el-dialog__headerbtn .el-dialog__close {
     color: #ffffff;
   }
   
 }
</style>