<template>
    <a-button 
    v-bind="props" 
    :loading="loading" 
    @click="onClick" 
    >
        <template v-for="(value, name) in $slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData || {}"></slot>
        </template>
    </a-button>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import type { ButtonProps } from '@arco-design/web-vue';

const attrs = useAttrs()
const loading = ref(false)
const props = defineProps<Omit<ButtonProps, 'loading'> & { onClick?: () => Promise<void> | void }>()
async function onClick(event: MouseEvent) {
    loading.value = true
    try{
        // @ts-ignore
        await attrs?.onClick?.()
    }finally{
        loading.value = false
    }
}

defineOptions({
    inheritAttrs:false
})
</script>
