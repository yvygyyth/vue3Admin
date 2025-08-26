import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('user', ()=>{
  const token = ref<string>('')

  const setToken = (token: string) => {
    token = token
  }

  return {
    token,
    setToken
  }
})
