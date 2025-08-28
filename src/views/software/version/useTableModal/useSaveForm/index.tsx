
import { Modal } from "@arco-design/web-vue"
import SaveModel from './SaveModal.vue'
import { ref } from 'vue'
import type { Version } from '@/api/software'


export const useSaveForm = (data?: Version) => {
    const modalConfig = {
        title: '新增',
        width: 600,
        footer: false,
    }

    const formData = ref({
        app_id: data?.app_id,
        version: data?.version,
        file_id: data?.file_id,
        release_notes: data?.release_notes
    })

    const submit = () => {
        console.log('提交',formData.value)
    }

    const open = () => {
        Modal.open({
            ...modalConfig,
            content: () => <SaveModel 
            v-model={formData.value}
            onSubmit={submit}
            />
        })
    }
    
    return {
        open
    }
}