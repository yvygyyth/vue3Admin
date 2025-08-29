
import { Modal, Message } from "@arco-design/web-vue"
import SaveModel from './SaveModal/index.vue'
import { ref } from 'vue'
import type { Version } from '@/api/software'
import type { SaveVersion } from '@/api/software'
import { saveVersion } from '@/api/software'


export const openSaveForm = (data?: Version) => {
    return new Promise((resolve) => {
        
        const formData = ref<Partial<SaveVersion>>({
            id: data?.id,
            app_id: data?.app_id,
            version: data?.version,
            file_id: data?.file_id,
            release_notes: data?.release_notes || ''
        })
    
        const submit = async() => {
            try {
                await saveVersion(formData.value as SaveVersion)
                Message.success(data?.id ? '编辑成功' : '新增成功')
                close()
                resolve(true)
            } catch (error) {
                console.log(error)
            }
        }
    
        const { close } = Modal.open({
            title: data?.id ? '编辑' : '新增',
            width: 600,
            footer: false,
            content: () => <SaveModel 
            v-model={formData.value}
            onSubmit={submit}
            />
        })

    })
}