import { Modal } from "@arco-design/web-vue"
import SaveModal from './SaveModal/index.vue'
import { ref } from 'vue'
import type { PermissionTree } from '@/api/permission'
import { savePermission, PermissionType, AccessLevel, AllowedAccessLevels } from '@/api/permission'

export const openSaveForm = (data?: PermissionTree | Omit<PermissionTree, 'id'>) => {
    return new Promise(async (resolve, reject) => {

        const permissionId = (data as PermissionTree)?.id || void 0

        const allowedAccessLevels = ref(data?.allowed_access_levels || AllowedAccessLevels.ALL)
        console.log('allowedAccessLevels', data)
        const formData = ref({
            id: permissionId,
            code: data?.code || '',
            name: data?.name || '',
            access_level: data?.access_level || AccessLevel.PRIVATE,
            type: data?.type || PermissionType.MENU,
            method: data?.method || void 0,
            route: data?.route || void 0,
            parent_id: data?.parent_id || void 0
        })

        const submit = async() => {
            try {
                await savePermission(formData.value)
                close()
                resolve(true)
            } catch (error) {
                console.log(error)
            }
        }
    
        const { close } = Modal.open({
            title: permissionId ? '编辑权限' : '新增权限',
            width: 600,
            footer: false,
            content: () => <SaveModal 
                v-model={formData.value}
                allowedAccessLevels={allowedAccessLevels.value}
                onSubmit={submit}
            />,
            onBeforeCancel: () => {
                reject(false)
                return true
            }
        })

    })
}
