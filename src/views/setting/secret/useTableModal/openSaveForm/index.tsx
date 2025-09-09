import { Modal } from '@arco-design/web-vue'
import { ref } from 'vue'
import SaveModal from './SaveModal/index.vue'
import type { Secret, SecretUpdate } from '@/api/secret'
import { updateSecret } from '@/api/secret'

export const openSaveForm = (record: Secret) => {
    return new Promise((resolve, reject) => {
        // 初始化表单数据
        const formData = ref<SecretUpdate & { key: string }>({
            id: record.id,
            key: record.key,
            value: '',
            description: record.description
        })

        const submit = async () => {
            try {
                const {
                    id,
                    value,
                    description
                } = formData.value
                await updateSecret({
                    id,
                    value,
                    description
                })
                close()
                resolve(true)
            } catch (error) {
                console.error('保存失败:', error)
                throw error
            }
        }


        const { close } = Modal.open({
            title: '编辑密钥',
            footer: false,
            width: 600,
            content: () => (
                <SaveModal
                    v-model={formData.value}
                    onSubmit={submit}
                />
            ),  
            onBeforeCancel: () => {
                reject(false)
                return true
            }
        })
    })
}
