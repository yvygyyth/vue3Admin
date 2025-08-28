<template>
    <div class="version-input">
        <a-input-number ref="majorRef" v-model="versionData.major" :min="0" :max="999" :precision="0" :step="1" :controls="false" hide-button
            placeholder="0" class="version-number-input" @keydown.enter="focusNext('minor')" />
        <span class="version-dot">.</span>
        <a-input-number ref="minorRef" v-model="versionData.minor" :min="0" :max="999" :precision="0" :step="1" :controls="false" hide-button
            placeholder="0" class="version-number-input" @keydown.enter="focusNext('patch')" />
        <span class="version-dot">.</span>
        <a-input-number ref="patchRef" v-model="versionData.patch" :min="0" :max="999" :precision="0" :step="1" :controls="false" hide-button
            placeholder="0" class="version-number-input" @keydown.enter="handleEnter" />
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
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
const versionData = computed({
    get() {
        // 从外部传入的字符串解析为三个数字
        if (!props.modelValue) {
            return { major: undefined, minor: undefined, patch: undefined }
        }

        const parts = props.modelValue.split('.')
        if (parts.length !== 3) {
            return { major: undefined, minor: undefined, patch: undefined }
        }

        const [majorPart, minorPart, patchPart] = parts

        // 判断是否为数字字符串
        const major = (majorPart && isNumericString(majorPart)) ? parseInt(majorPart, 10) : undefined
        const minor = (minorPart && isNumericString(minorPart)) ? parseInt(minorPart, 10) : undefined
        const patch = (patchPart && isNumericString(patchPart)) ? parseInt(patchPart, 10) : undefined

        return { major, minor, patch }
    },
    set(value: { major?: number; minor?: number; patch?: number }) {
        // 将三个数字组合成字符串向外传递
        const values = [value.major, value.minor, value.patch]
        
        // 如果有任何一个值为 undefined，则传递空字符串
        if (values.some(v => v === undefined)) {
            emit('update:modelValue', '')
            return
        }

        // 使用 join 方法组合版本号
        const versionString = values.join('.')
        emit('update:modelValue', versionString)
    }
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
        emit('update:modelValue', '')
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
