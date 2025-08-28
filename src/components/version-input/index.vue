<template>
    <div class="version-input">
        <a-input-number ref="majorRef" v-model="versionData.major" :min="0" :max="999" :precision="0" :step="1"
            :controls="false" hide-button class="version-number-input" @keydown.enter="focusNext('minor')" />
        <span class="version-dot">.</span>
        <a-input-number ref="minorRef" v-model="versionData.minor" :min="0" :max="999" :precision="0" :step="1"
            :controls="false" hide-button class="version-number-input" @keydown.enter="focusNext('patch')" />
        <span class="version-dot">.</span>
        <a-input-number ref="patchRef" v-model="versionData.patch" :min="0" :max="999" :precision="0" :step="1"
            :controls="false" hide-button class="version-number-input" @keydown.enter="handleEnter" />
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'

const defaultNumber = 0
const defaultVersion = '0.0.0'

const props = defineProps({
    modelValue: {
        type: String,
        default: defaultVersion
    }
})


const emit = defineEmits(['update:modelValue'])



// 输入框引用
const majorRef = ref()
const minorRef = ref()
const patchRef = ref()

// 判断字符串是否为数字字符串
const isNumericString = (str: string): boolean => {
    return /^\d+$/.test(str)
}

// 使用计算属性处理双向绑定
const versionData = computed(() => {
    return new Proxy({
        major: defaultNumber,
        minor: defaultNumber,
        patch: defaultNumber
    }, {
        get(_, key: string) {
            const parts = props.modelValue.split('.')
            const [major, minor, patch] = parts.map(p => /^\d+$/.test(p) ? parseInt(p, 10) : defaultNumber)

            if (key === 'major') return major
            if (key === 'minor') return minor
            if (key === 'patch') return patch
        },
        set(_, key: string, value: number) {
            const parts = props.modelValue.split('.')
            
            let [major, minor, patch] = parts.map(p => /^\d+$/.test(p) ? parseInt(p, 10) : defaultNumber)

            if (key === 'major') major = value
            if (key === 'minor') minor = value
            if (key === 'patch') patch = value

            emit('update:modelValue', [major, minor, patch].join('.'))
            return true
        }
    })
})


// 聚焦下一个输入框
const focusNext = (target: 'minor' | 'patch') => {
    nextTick(() => {
        if (target === 'minor') {
            minorRef.value?.focus()
        } else if (target === 'patch') {
            patchRef.value?.focus()
        }
    })
}

// 处理最后一个输入框的回车
const handleEnter = () => {
    // 可以在这里添加其他逻辑，比如触发表单提交等
    patchRef.value?.blur()
}

// 暴露方法供外部调用
defineExpose({
    focus: () => {
        majorRef.value?.focus()
    },
    clear: () => {
        emit('update:modelValue', defaultVersion)
    }
})
</script>

<style scoped>
.version-input {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.version-number-input {
    width: 6ch;
}

.version-number-input :deep(.arco-input) {
    text-align: center;
}

.version-dot {
    color: var(--color-text-2);
    font-weight: 500;
    user-select: none;
}
</style>
