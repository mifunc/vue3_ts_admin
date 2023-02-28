export interface LoginParam{
    userName:string,
    passWord:string,
}

export interface UserSearch{
    userName:string
	deptId:number
	nickName:string
	pageSize:number
	page:number
}

export interface UserResponse{
	list:[],
	pagination:{
		totalCount:number,
		pageSize:number,
		currentPage:number,
		page:number
	}
}