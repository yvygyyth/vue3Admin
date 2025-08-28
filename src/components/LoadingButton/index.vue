<template>
    <component 
    :is="h(Button, {
        ...$attrs,
        loading: loading,
        onClick: onClick,
        ref: changeRef,
    }, $slots)"
    ></component>
</template>

<script setup lang="ts">
import { Button } from '@arco-design/web-vue'
import { getCurrentInstance, h, ref, type ComponentInstance } from 'vue'

const props = defineProps<{
    onClick?: (event: MouseEvent) => Promise<void> | void
}>()

const vw = getCurrentInstance()

const loading = ref(false)
async function onClick(event: MouseEvent) {
    loading.value = true
    try{
        await props.onClick?.(event)
    }finally{
        loading.value = false
    }
}

function changeRef(exposed:any) {
    vw!.exposed = {
        onClick,
        ...exposed
    }
}

defineExpose({} as ComponentInstance<typeof Button>)
</script>
