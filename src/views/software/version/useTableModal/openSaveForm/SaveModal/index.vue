<template>
    <a-form :model="formData" ref="formRef" :rules="rule">
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
            <VersionInput 
            v-model="formData.version" />
        </a-form-item>

        <a-form-item field="file_id" label="文件">
            <a-upload 
            v-model:file-list="fileList.value"
            draggable
            :custom-request="useCustomRequest"
            :limit="1"
            @success="handleSuccess"
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
import { syncRequestRef, asyncRequestRef } from '@/hooks/syncRequestRef'
import VersionInput from '@/components/version-input/index.vue'
import { useCustomRequest } from './useCustomRequest.ts'
import { rule } from './rule'
import type { FileResult } from '@/api/upload/type'
import { getFileInfo } from '@/api/file'

const props = defineProps({
    modelValue:{
        type: Object as PropType<SaveVersion>,
        required: true
    }
})


const emit = defineEmits(['update:modelValue', 'submit'])

const formData = useVModel(props, 'modelValue', emit)


const formRef = useTemplateRef<FormInstance>('formRef')

const softTypeList = syncRequestRef(getSoftTypeList, [])

const fileList = asyncRequestRef(() => {
    if(!formData.value.file_id) return Promise.resolve([])
    return getFileInfo(formData.value.file_id).then(res=>{
        return [{
            uid: res.id,
            name: res.name
        }]
    })
}, [])

const handleSuccess = ({ response }: { response: FileResult }) => {
    formData.value.file_id = response.id
}

const handleSubmit = async() => {
    await formRef.value.validate()
    await emit('submit', formData.value)
}


</script>