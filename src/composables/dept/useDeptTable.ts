import { getDepartListApi } from "@/api/dept/dept";
import { onMounted, reactive } from "vue";

export default function useDeptTable(){
    const tableData=reactive<any>({
         list:[]
    })
    const getDeptList=async()=>{
         let res=await getDepartListApi()
         if(res.code==0){
            tableData.list=res.data
         }
    }
    onMounted(() => {
        getDeptList()
    })
    
    return {
        tableData,
        getDeptList
    }
}