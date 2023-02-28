import { AddDeptModel } from "@/api/dept/deptModel";
import { FormInstance } from "element-plus";
import { reactive, ref } from "vue";

export default function useDeptModel(){
    const addDeptForm=ref<FormInstance>()
    const dialogModel=reactive<AddDeptModel>({
        deptId:"",
        parentId:"",
        parentName:"",
        ancestors:"",
        deptName:"",
        orderNum:"",
        leader:"",
        phone:"",
        email:""
    })
    const rules=reactive({
        parentName:[
            { required: true, message: '请选择父级部门', trigger: 'click' },
            { min: 2, max: 5, message: '长度在2到5之间', trigger: 'click' },
        ],
        deptName:[
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在2到5之间', trigger: 'blur' },
        ],
        leader:[
            { required: true, message: '请输入部门负责人', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在2到5之间', trigger: 'blur' },
        ],
        email:[
            { required: true, message: '请输入Email', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在2到20之间', trigger: 'blur' },
        ]
    })
    return{
        dialogModel,
        rules,
        addDeptForm
    }
}