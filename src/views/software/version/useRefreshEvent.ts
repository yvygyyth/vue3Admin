import { ref } from 'vue'

// 创建一个响应式的刷新触发器
const refreshTrigger = ref(0)

export const useRefreshEvent = () => {
    // 触发刷新事件
    const triggerRefresh = () => {
        refreshTrigger.value++
    }

    // 监听刷新事件
    const onRefresh = (callback: () => void) => {
        // 使用 watchEffect 来监听 refreshTrigger 的变化
        const { watchEffect } = require('vue')
        return watchEffect(() => {
            if (refreshTrigger.value > 0) {
                callback()
            }
        })
    }

    return {
        triggerRefresh,
        onRefresh,
        refreshTrigger
    }
}
