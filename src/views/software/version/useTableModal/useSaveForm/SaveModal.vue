<template>
    <a-form :model="formData" ref="formRef">
        <a-form-item 
        field="app_id" 
        label="软件类型"
        >
            <a-select 
                placeholder="请选择软件类型" 
                :loading="softTypeList.loading"
                :options="softTypeList.value"
                :field-names="{
                    label: 'name',
                    value: 'id'
                }"
                v-model="formData.app_id"/>
        </a-form-item>

        <a-form-item field="version" label="版本号">
            <VersionInput v-model="formData.version" />
        </a-form-item>

        <a-form-item field="file_id" label="文件">
            <a-upload 
            :custom-request="useCustomRequest"
            :limit="1"
             />
        </a-form-item>

        <a-form-item field="release_notes" label="更新内容">
            <a-textarea 
            v-model="formData.release_notes"
            placeholder="请输入更新内容" 
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
import { getSoftTypeList } from '@/api/software'
import type { SaveVersion } from '@/api/software'
import { syncRequestRef } from '@/hooks/syncRequestRef'
import VersionInput from '@/components/version-input/index.vue'
import { useCustomRequest } from './useCustomRequest'

const props = defineProps({
    modelValue:{
        type: Object as PropType<SaveVersion>,
        required: true
    }
})


const emit = defineEmits(['update:modelValue'])

const formData = useVModel(props, 'modelValue', emit)


const formRef = useTemplateRef<FormInstance>('formRef')

const softTypeList = syncRequestRef(getSoftTypeList, [])

console.log(softTypeList.value)

const handleSubmit = async() => {
    await formRef.value.validate()
    await new Promise(resolve => setTimeout(resolve, 10000))
    // emit('submit', modelValue.value)
}


</script>