import { Modal } from '@arco-design/web-vue'
import { h } from 'vue'
import { openSaveForm as openSaveFormComponent } from './openSaveForm'
import type { PermissionTree } from '@/api/permission'

export const openSaveForm = (data?: Partial<PermissionTree>) => {
    return new Promise((resolve, reject) => {
        const modal = Modal.open({
            title: data?.id ? '编辑权限' : '新增权限',
            content: () => h(openSaveFormComponent, {
                data,
                onSuccess: () => {
                    modal.close()
                    resolve(true)
                },
                onCancel: () => {
                    modal.close()
                    reject(false)
                }
            }),
            footer: false,
            width: 600
        })
    })
}
