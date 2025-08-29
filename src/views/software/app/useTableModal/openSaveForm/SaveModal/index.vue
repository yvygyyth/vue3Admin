<template>
    <a-form :model="formData" ref="formRef" :rules="rule">
        <a-form-item 
        field="app_key" 
        label="应用标识"
        >
            <a-input 
                placeholder="请输入应用标识" 
                v-model="formData.app_key"/>
        </a-form-item>

        <a-form-item field="name" label="应用名称">
            <a-input 
            placeholder="请输入应用名称"
            v-model="formData.name" />
        </a-form-item>

        <a-form-item field="description" label="应用描述">
            <a-textarea 
            v-model="formData.description"
            placeholder="请输入应用描述" 
            allow-clear/>
        </a-form-item>

        <a-form-item>
            <LoadingButton html-type="submit" type="primary" @click="handleSubmit">保存</LoadingButton>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
import { useTemplateRef, type PropType } from 'vue'
import type { FormInstance } from '@arco-design/web-vue'
import LoadingButton from '@/components/LoadingButton/index.vue'
import { useVModel } from '@vueuse/core'
import type { SaveAppType } from '@/api/software'
import { rule } from './rule'

const props = defineProps({
    modelValue:{
        type: Object as PropType<SaveAppType>,
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = useVModel(props, 'modelValue', emit)

const formRef = useTemplateRef<FormInstance>('formRef')

const handleSubmit = async() => {
    await formRef.value.validate()
    await emit('submit', formData.value)
}

</script>
