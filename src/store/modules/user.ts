import { Result } from "@/api/result"
import { loginApi } from "@/api/user/user"
import { LoginParam } from "@/api/user/userParm"
import { ActionContext } from "vuex"
import { RootState } from ".."
import {setUserName,setToken} from '@/utils/auth'

export type UserState={
    userName:string,
    token:string
}


export const state:UserState={
    userName:'',
    token:''
}
export const mutations={
    setToken(state:UserState,token:string){
        state.token=token
    },
    setUserName(state:UserState,userName:string){
        state.userName=userName

    }
}

export const actions={
    login({commit}:ActionContext<UserState,RootState>,parm:LoginParam){
        return new Promise<Result>((resolve,reject)=>{
            loginApi(parm).then(res=>{
                console.log(res)
                if(res.code==0){
                    commit("setToken",res.data.token)
                    commit("setUserName",res.data.username)
                    setUserName(res.data.username)
                    setToken(res.data.token)
                }
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        })
       
    }
}

export const getters={

}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}