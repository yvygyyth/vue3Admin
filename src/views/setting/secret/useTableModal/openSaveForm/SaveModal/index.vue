<template>
    <a-form :model="formData" ref="formRef" :rules="rule">
        <a-form-item 
            field="key" 
            label="密钥名称"
        >
            <a-input 
                placeholder="密钥名称（只读）" 
                v-model="formData.key"
                readonly/>
        </a-form-item>

        <a-form-item field="value" label="密钥值">
            <a-textarea 
                v-model="formData.value"
                placeholder="请输入密钥值" 
                allow-clear
                :max-length="1000"
                show-word-limit
                :rows="4"/>
        </a-form-item>

        <a-form-item field="description" label="描述">
            <a-textarea 
                v-model="formData.description"
                placeholder="可以输入描述说明密钥的用途" 
                allow-clear
                :max-length="1000"
                show-word-limit
                :rows="4"/>
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
import type { SecretUpdate } from '@/api/secret'
import { rule } from './rule'

const props = defineProps({
    modelValue:{
        type: Object as PropType<SecretUpdate & { key: string }>,
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = useVModel(props, 'modelValue', emit)
const formRef = useTemplateRef<FormInstance>('formRef')

const handleSubmit = async() => {
    await formRef.value?.validate()
    await emit('submit', formData.value)
}

</script>
