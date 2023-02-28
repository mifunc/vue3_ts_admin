import { ElForm } from "element-plus";
import { ref,reactive } from "vue";

export default function userLoginModel(){
    const loginFormRef=ref<InstanceType<typeof ElForm>>();

    const formModel=reactive({
        username:'',
        password:''
    })
    const rules=reactive({
        username:[
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 10, message: '账号的长度在5到10之间', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在6到15之间', trigger: 'blur' },
        ]
    })
    return {
        loginFormRef,
        formModel,
        rules
    }
}