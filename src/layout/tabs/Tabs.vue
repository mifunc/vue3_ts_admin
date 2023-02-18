<template>
    <el-tabs
    v-model="activeTab"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="tabClick"
  >
    <el-tab-pane
      v-for="item in tabsList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang='ts'>
import {ref,watch,onMounted} from 'vue'
import { computed} from 'vue'
import {useStore} from '@/store'
import {useRoute,useRouter} from 'vue-router'
import {Itab} from '@/store/type/index'
const store=useStore()
const route=useRoute()
const router=useRouter()

const tabsList = computed(()=>{
    return store.getters['getTabsList']
})
const addTab=()=>{
    const {path,meta} = route
    const tab:Itab={
       title:meta.title as string,
       path:path
    }
    store.commit('addTabs',tab)
}

const activeTab=ref('')

const tabClick=(tab:any)=>{
    const {props}=tab
    router.push({path:props.name})
}

const removeTab = (targetName: string) => {
  const tabs = tabsList.value
  let activeName = activeTab.value
  if (activeName === targetName) {
    tabs.forEach((tab:Itab, index:number) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }

  activeTab.value = activeName
  store.state.tabsList = tabs.filter((tab:Itab) => tab.path !== targetName)
  router.push({path:activeName})
}
const setActive=()=>{
    activeTab.value=route.path
}
const beforeUnload=()=>{
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("tabViews",JSON.stringify(tabsList.value))
    })
    let tabSession=sessionStorage.getItem("tabViews");
    if(tabSession){
        let oldViews=JSON.parse(tabSession)
        if(oldViews.length>0){
            store.state.tabsList=oldViews;
        }
    }
}

onMounted(() => {
    beforeUnload()
    setActive()
    addTab()
}),

watch(()=>route.path,()=>{
    setActive()
    addTab()
})

</script>
<style scoped lang='scss'>
:deep(.el-tabs__item) {
  height: 30px !important;
  line-height:30px;

}

:deep(.el-tabs__header) {
    height: 30px !important;
}
:deep(.is-active) {
  border-bottom: 1px solid transparent !important;
  border: 1px solid #42b983 !important;
  background-color: #42b983 !important;
  color: #fff !important;
}
</style>