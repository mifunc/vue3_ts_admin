import { LoginParam } from "@/api/user/userParm";
import {useStore} from '@/store'
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default function userLogin(parm:LoginParam){

    const store=useStore()
    const router=useRouter()
    const {proxy}=getCurrentInstance() as any
    const login=async()=>{
        proxy.$refs.loginFormRef.validate(async(vaild:boolean)=>{
            if(vaild){
                store.dispatch('user/login',parm).then(res=>{
                    if(res.code==0){
                        router.push({path:"/"})
                    }
                })
            }
        })
    }
    return {
        login
    }
}