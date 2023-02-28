import { getDepartListApi } from "@/api/dept/dept";
import { DeptModel, SelectdNode } from "@/api/dept/deptModel";
import { ElTree } from "element-plus";
import { reactive,ref } from "vue";
export default function useDeptDialog(emit?:any){

    const deptDialogRef = ref<InstanceType<typeof ElTree>>();
    const treeData=reactive<any>({
        data:[]
    })

    const defaultProps = {
        children: 'children',
        label: 'deptName',
    }
    const getTreeDate=async()=>{
       let res=await getDepartListApi()
       if(res.code==0){
         treeData.data=res.data
       }

    }
    const selectdNode=reactive<SelectdNode>({
       ancestors:"",
       parentId:"",
       deptName:""
    })
    
    const handNodeClick=(data:DeptModel)=>{
        if(emit){
            emit("nodeClick",data.deptId)
        }
       
        selectdNode.ancestors=data.ancestors
        selectdNode.parentId=data.parentId
        selectdNode.deptName=data.deptName
    }
    const openBtn=(data:DeptModel)=>{
        //设置展开或者关闭            
        data.open = !data.open;
        if (deptDialogRef.value) {
            deptDialogRef.value.store.nodesMap[data.deptId].expanded = !data.open;
        }
    }

    return {
        treeData,
        defaultProps,
        getTreeDate,
        handNodeClick,
        selectdNode,
        openBtn,
        deptDialogRef

    }
}