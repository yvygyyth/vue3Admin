import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DependencyHub, Keys } from '@/hooks/useRequestInjectorManager'

export default defineStore('user', () => {
    const token = ref<string>('')
    const setToken = (val: string) => token.value = val

    DependencyHub.register(Keys.getToken, () => {
        return token.value
    })

    return {
        token,
        setToken
    }
}, {
    persist: true
})
