import { Modal, Message } from "@arco-design/web-vue"
import SaveModal from './SaveModal/index.vue'
import { ref } from 'vue'
import type { PermissionTree } from '@/api/permission'
import { savePermission, PermissionType } from '@/api/permission'

export const openSaveForm = (data?: Partial<PermissionTree>) => {
    return new Promise(async (resolve, reject) => {
        
        const formData = ref({
            id: data?.id,
            code: data?.code || '',
            name: data?.name || '',
            type: data?.type || PermissionType.MENU,
            method: data?.method || '',
            route: data?.route || '',
            parent_id: data?.parent_id || null
        })

        const submit = async() => {
            try {
                const saveData = {
                    ...formData.value,
                    method: formData.value.method || null,
                    route: formData.value.route || null,
                    parent_id: formData.value.parent_id || null
                }
                
                await savePermission(saveData as any)
                Message.success(formData.value.id ? '编辑成功' : '新增成功')
                close()
                resolve(true)
            } catch (error) {
                Message.error(formData.value.id ? '编辑失败' : '新增失败')
                console.log(error)
            }
        }
    
        const { close } = Modal.open({
            title: data?.id ? '编辑权限' : '新增权限',
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
