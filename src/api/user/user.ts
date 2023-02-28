import {LoginParam, UserSearch} from '@/api/user/userParm'
import http from '@/http/http'
enum Api{
    login='/api/user/login',
    getUserList='/api/user/userList'
}

export async function loginApi(params:LoginParam) {
    return await http.post(Api.login,params)
}

export async function getDepartListApi<UserResponse>(params:UserSearch){
    return await http.get(Api.getUserList,params)
}