import request from '@/http/request'
const http=new request({
    baseURL:"http://127.0.0.1:8081",
    timeout:10000
})
export default http
