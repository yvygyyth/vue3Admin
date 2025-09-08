import { Modal, Message } from "@arco-design/web-vue"
import SaveModal from './SaveModal/index.vue'
import { ref } from 'vue'
import type { RoleWithPermissions } from '@/api/role'
import { saveRole } from '@/api/role'

export const openSaveForm = (data?: Partial<RoleWithPermissions>) => {
    return new Promise(async (resolve, reject) => {
        
        const formData = ref({
            id: data?.id,
            name: data?.name || '',
            description: data?.description || '',
            permissionIds: data?.permissionIds || []
        })

        const submit = async() => {
            try {
                await saveRole(formData.value)
                close()
                resolve(true)
            } catch (error) {
                console.log(error)
            }
        }
    
        const { close } = Modal.open({
            title: data?.id ? '编辑角色' : '新增角色',
            width: 600,
            footer: false,
            content: () => <SaveModal 
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
