import menus,{MenusState} from '@/store/modules/menus'
import tabs,{TabState} from '@/store/modules/tabs'
import user, {UserState} from '@/store/modules/user'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'


export type RootState={
  menus:MenusState,
  tabs:TabState,
  user:UserState
}
export const key: InjectionKey<Store<RootState>> = Symbol()


export const mds={
  menus:menus,
  tabs:tabs,
  user:user
}

export const store= createStore({
  modules:mds
})

export function useStore(){
  return baseUseStore(key)
}