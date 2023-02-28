enum Keys{
    Token = 'token',
    UserName = 'userName'
}
//存储token到session
export const setToken = (token:string)=>{
    sessionStorage.setItem(Keys.Token,token)
}
export const getToken = ()=>{
    return sessionStorage.getItem(Keys.Token)
}
//存储userId到sessionStorage
export const setUserName = (userName:string)=>{
    sessionStorage.setItem(Keys.UserName,JSON.stringify(userName))
}
export const getUserId = ()=>{
    return sessionStorage.getItem(Keys.Token)
}

//session清空
export const cleanSession = () =>{
    sessionStorage.clear()
}