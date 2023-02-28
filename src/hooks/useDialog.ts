import { DialogModel } from "@/type/baseType";
import { reactive } from "vue";

export default function useDialog(){
    const dialog=reactive<DialogModel>({
        title:'',
        visible:false,
        width:630,
        height:220
    })
    const onShow=()=>{
        dialog.visible=true
    }
    const onClose=()=>{
        dialog.visible=false
    }
    const onConfirm=()=>{
        dialog.visible=false
    }

    return {
        dialog,
        onShow,
        onClose,
        onConfirm
    }
}