import { Modal, Message } from "@arco-design/web-vue"
import SaveModel from './SaveModal/index.vue'
import { ref } from 'vue'
import type { softwareType } from '@/api/software'
import type { SaveAppType } from '@/api/software'
import { saveSoftType } from '@/api/software'

export const openSaveForm = (data?: softwareType) => {
    return new Promise((resolve, reject) => {
        
        const formData = ref<Partial<SaveAppType>>({
            id: data?.id,
            app_key: data?.app_key || '',
            name: data?.name || '',
            description: data?.description || ''
        })
    
        const submit = async() => {
            try {
                await saveSoftType(formData.value as SaveAppType)
                close()
                resolve(true)
            } catch (error) {
                console.log(error)
            }
        }
    
        const { close } = Modal.open({
            title: data?.id ? '编辑应用' : '新增应用',
            width: 600,
            footer: false,
            content: () => <SaveModel 
            v-model={formData.value}
            onSubmit={submit}
            />,
            onBeforeCancel: () => {
                reject(false)
                return true
            }
        })

    })
}
