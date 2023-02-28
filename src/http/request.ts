import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse,AxiosError } from "axios";
import {ElMessage} from 'element-plus'
import {ResultEnum,ContentTypeEnum} from '@/enums/httpEnum'
import {checkStatus} from '@/http/checkStatus'
import router from '@/router/index'
import qs from 'qs'
import {Result} from '@/api/Result'
class request{
    private instance:AxiosInstance
    constructor(config:AxiosRequestConfig){
        this.instance=axios.create(config)
        this.interceptors()
    }
    private interceptors(){
        //请求之前的统一拦截
        this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            let token=''
            if(token){
                config.headers!.token=token
            }
            return config
        },(error:AxiosError)=>{
            return Promise.reject(error);
        });
        this.instance.interceptors.response.use((res:AxiosResponse)=>{
           const {data}=res
           if(data.code==ResultEnum.ONAUTH){
            router.replace("/login");
            return Promise.reject(data)
           }
           if(data.code&&data.code!==ResultEnum.SUCCESS){
            ElMessage.error(data.msg || '服务器出错!')
            return Promise.reject(data)
           }
           return data;
        },(error:AxiosError)=>{
            const { response } = error;
            // 请求超时 && 网络错误单独判断，没有 response
            if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
            if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
            // 根据响应的错误状态码，做不同的处理
            if (response) checkStatus(response.status);
            // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
			if (!window.navigator.onLine) router.replace("/500");
            return Promise.reject(error);
        });
    }
    getParms(parms: any): string {
        let _params = "";
        if (Object.is(parms, undefined || null)) {
            _params = ''
        } else {
            for (const key in parms) {
                if (parms.hasOwnProperty(key) && parms[key]) {
                    _params += `${parms[key]}/`
                }
            }
        }
        //去掉参数最后一位/
        if (_params) _params = _params.substr(0, _params.length - 1);
        return _params;
    }
    /**
     *  /api/user/getUserById?userId=10
     * @param url   /api/user/getUserById
     * @param parms  {userId:10}
     * @returns 
     */
    get<T = any>(url: string, parms?: any): Promise<Result<T>> {
        console.log(111111111111)
        console.log(parms)
        return new Promise((resolve, reject) => {
            this.instance.get<T>(url, {
                params: parms,
                paramsSerializer:{
                    serialize: (params: any) => {
                        return qs.stringify(params);
                    }
                } 
            }).then((res) => {
                resolve(res as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    getRestApi<T = any>(url: string, parms?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.get<T>(this.getParms(parms) ? `${url}/${this.getParms(parms)}` : url)
                .then((res) => {
                    resolve(res.data as any)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    post<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.post<T>(url, parms, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': ContentTypeEnum.JSON
                }
            }).then((res) => {

                resolve(res as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    put<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.put<T>(url, parms, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': ContentTypeEnum.JSON
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    delete<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.delete<T>(this.getParms(parms) ? `${url}/${this.getParms(parms)}` : url)
                .then((res) => {
                    resolve(res.data as any)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    login<T>(url: string, params: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.post<T>(url, params, {
                transformRequest: [(params) => {
                    return qs.stringify(params)
                }],
                headers: {
                    'Content-Type': ContentTypeEnum.FORM_URLENCODED
                }
            }).then((res) => {
                resolve(res as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    getImage(url: string) {
        return this.instance.post(url, null, {
            responseType: ContentTypeEnum.ARRAY_BUFFER
        })
    }

}

export default request;