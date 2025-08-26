import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DependencyHub, Keys } from '@/hooks/useRequestInjectorManager'

export default defineStore('user', ()=>{
  const tokenRef = ref<string>('')

  const setToken = (token: string) => tokenRef.value = token
  console.log('注册token',tokenRef.value)
  DependencyHub.register(Keys.getToken, () => {
    return tokenRef.value
  })

  return {
    token: tokenRef,
    setToken
  }
})
