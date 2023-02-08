<template>
    <div>{{ showCount }}</div>
    <button @click="add">n++</button>
</template>

<script setup lang="ts">
import {computed,ref} from 'vue'
import {useStore} from '../store'

const count=ref(0)
const store=useStore()
const showCount=computed(()=>{
  return store.getters["getCount"]
})
const add=()=>{
  store.commit('setCount',++count.value);
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
