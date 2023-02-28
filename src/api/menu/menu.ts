import http from '@/http/http'
enum Api{
    getMenuList="/api/menu/tree"
}

export  async function getMenuListApi() {
    return await http.get(Api.getMenuList,)
    
}