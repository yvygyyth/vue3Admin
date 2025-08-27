
import { Modal } from "@arco-design/web-vue"
import SaveModel from './SaveModal.vue'
import { ref } from 'vue'

export const useSaveForm = () => {
    const modalConfig = {
        title: '新增',
        width: 600,
        footer: false,
    }

    const formData = ref({
        name: '',
    })

    const submit = (data: any) => {
        console.log(data)
    }

    const open = (data: any) => {
        Modal.open({
            ...modalConfig,
            content: () => <SaveModel 
            v-model={formData.value}
            />
        })
    }
    
    return {
        open
    }
}