<template>
     <el-tree 
     ref="deptDialogRef" 
     :data="treeData.data" 
     node-key="deptId" 
     :props="defaultProps" 
     @node-click="handNodeClick"
     default-expand-all
     :highlight-current="true"
     :expand-on-click-node="false"
     >
     <template #default="{ node, data }">
            <div class="custom-tree-container">
                <!-- 长度为0说明没有下级 -->
                <span v-if="!data.children || data.children.length == 0">
                    <Document style="width: 1.3em; height: 1.3em; margin-right: 5px;color: #8c8c8c;"/>
                </span>
                <!-- 点击展开和关闭 -->
                <span v-else @click.stop="openBtn(data)">
                    <component style="width: 1.1em; height: 1.1em; margin-right: 5px;color: #8c8c8c;" :is="data.open ? Plus : Minus" />
                </span>
                <span>{{ node.label }}</span>
            </div>
    </template>
    </el-tree>
</template>
<script setup lang='ts'>
import {Plus,Minus,Document} from '@element-plus/icons'
import useDeptDialog from '@/composables/dept/useDeptDialog'
import { nextTick, onMounted } from 'vue';

const emit=defineEmits(["nodeClick"])

const {treeData,defaultProps,openBtn,getTreeDate,handNodeClick,selectdNode,deptDialogRef}=useDeptDialog(emit)


onMounted(() => {
  nextTick(async()=>{
    await getTreeDate()
    deptDialogRef.value?.setCurrentKey(treeData.data[0].deptId) 
  })
})
</script>
<style  lang='scss'>
.el-tree {
  // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }
  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 20px;
  }
  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }
  .el-tree > .el-tree-node:before {
    border-left: none;
  }
  .el-tree > .el-tree-node:after {
    border-top: none;
  }
  //这自定义的线 的公共部分
  .el-tree-node:before,
  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
  .tree :first-child .el-tree-node:before {
    border-left: none;
  }
  // 竖线
  .el-tree-node:before {
    border-left: 1px dotted #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }
  //横线
  .el-tree-node:after {
    border-top: 1px dotted #d9d9d9;
    height: 20px;
    top: 14px;
    width: 24px;
  }
  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }
  //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }
  //每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
    padding-left: 10px !important;
  }
}
//去掉最上级的before  after 即是去电最上层的连接线
.el-tree > div {
  &::before {
    display: none;
  }
  &::after {
    display: none;
  }
}
</style>