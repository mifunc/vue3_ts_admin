import { Itab } from '@/store/type/index'

export type TabState={
    tabsList:Array<Itab>
}
export const state:TabState={
    tabsList:[]
}

export const mutations={
    addTabs:(state:TabState,tab:Itab)=>{
        if(state.tabsList.some(item=>item.path===tab.path)) return
        state.tabsList.push(tab)
    }

}

export const actions={

}

export const getters={
    getTabsList:(state:TabState)=>{
        return state.tabsList
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}