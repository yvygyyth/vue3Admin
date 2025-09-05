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
                const saveData = {
                    ...formData.value,
                    permissionIds: formData.value.permissionIds || []
                }
                
                await saveRole(saveData as any)
                Message.success(formData.value.id ? '编辑成功' : '新增成功')
                close()
                resolve(true)
            } catch (error) {
                Message.error(formData.value.id ? '编辑失败' : '新增失败')
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
