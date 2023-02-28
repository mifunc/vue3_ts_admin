
export interface DeptModel{
    deptId:number,
    parentId:number,
    parentName:string,
    ancestors:string,
    deptName:string,
    orderNum:number,
    leader:string,
    phone:string,
    email:string,
    open: boolean
}

export interface AddDeptModel{
    deptId:number|string,
    parentId:number|string,
    parentName:string,
    ancestors:string,
    deptName:string,
    orderNum:number|string,
    leader:string,
    phone:string,
    email:string
}

export interface SelectdNode{
    ancestors:string,
    parentId:number|string,
    deptName:string
}