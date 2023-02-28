import { onMounted, reactive,nextTick,ref } from "vue"
import {getDepartListApi} from '@/api/user/user'
import { UserResponse, UserSearch } from "@/api/user/userParm"
export default function useUser(){
    let tableData=ref<UserResponse>({
        list:[],
        pagination:{
            totalCount:0,
            pageSize:10,
            currentPage:0,
            page:0
        }
    })
    const params=reactive<UserSearch>({
        userName:"",
        deptId:-1,
        nickName:"",
        pageSize:10,
        page:1
    })
    const userDetail=()=>{

    }
    const nodeClick=(deptId:number)=>{
        params.deptId=deptId
        getUserList()

    }
    const getUserList=async()=>{
        let res=await getDepartListApi<UserResponse>(params)
        if(res.code==0){
            tableData.value=res.data
            
        }
    }
    onMounted(() => {
        nextTick(()=>{
            getUserList()
        })
       
    })
    const currentChange=(page:number)=>{
        params.page=page
        getUserList()
    }
    const search=()=>{
        getUserList()
    }
    return {
        tableData,
        userDetail,
        getUserList,
        nodeClick,
        currentChange,
        params,
        search
    }
}