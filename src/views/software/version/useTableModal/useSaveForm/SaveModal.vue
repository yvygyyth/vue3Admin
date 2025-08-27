<template>
    <a-form :model="modelValue" ref="formRef">
        <a-form-item field="name" tooltip="Please enter username" label="Username">
            <a-input v-model="modelValue.name" placeholder="please enter your username..." />
        </a-form-item>

        <a-form-item>
            <LoadingButton html-type="submit" @click="handleSubmit">Submit</LoadingButton>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
import { defineModel, useTemplateRef, type PropType } from 'vue'
import type { FormInstance } from '@arco-design/web-vue'
import LoadingButton from '@/components/LoadingButton/index.vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
    modelValue:{
        type: Object as PropType<{
            name: string
        }>,
        required: true
    }
})


const emit = defineEmits(['update:modelValue'])

const modelValue = useVModel(props, 'modelValue', emit)

// const modelValue = defineModel<{
//     name: string
// }>({
//     required: true
// })

const formRef = useTemplateRef<FormInstance>('formRef')

const handleSubmit = async() => {
    await formRef.value.validate()
    // emit('submit', modelValue.value)
}


</script>