import { Modal } from "@arco-design/web-vue"
import SaveModal from './SaveModal/index.vue'
import { ref } from 'vue'
import type { PermissionTree } from '@/api/permission'
import { savePermission, PermissionType, AccessLevel, Method, AllowedAccessLevels } from '@/api/permission'

export const openSaveForm = (data?: PermissionTree) => {
    return new Promise(async (resolve, reject) => {

        const allowedAccessLevels = ref(data?.allowed_access_levels || AllowedAccessLevels.ALL)
        
        const formData = ref({
            id: data?.id,
            code: data?.code || '',
            name: data?.name || '',
            access_level: data?.access_level || AccessLevel.PRIVATE,
            type: data?.type || PermissionType.MENU,
            method: data?.method || Method.GET,
            route: data?.route || '',
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
            title: data?.id ? '编辑权限' : '新增权限',
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
