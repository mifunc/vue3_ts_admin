import http from '@/http/http'

enum Api{
    getDepartList="/api/dept/tree"
}
export async function getDepartListApi() {
    return await http.get(Api.getDepartList)
}