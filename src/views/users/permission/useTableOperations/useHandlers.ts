import { openSaveForm } from '../useTableModal/index'
import { Message } from '@arco-design/web-vue'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'
import { deletePermission, deletePermissionTreeCache, type PermissionTree } from '@/api/permission'

export const useHandlers = () => {

    const editOk = async(record: PermissionTree) => {
        try {
            await openSaveForm(record)
            Message.success('编辑权限成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    const addChildOk = async(record: PermissionTree) => {
        try {
            await openSaveForm({ parent_id: record.id })
            Message.success('新增子权限成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    const deleteOk = async(record: PermissionTree) => {
        try {
            await deletePermission(record.id)
            // 删除缓存，确保下次获取最新数据
            deletePermissionTreeCache()
            Message.success('删除权限成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
   
        }
    }

    return {
        editOk,
        addChildOk,
        deleteOk
    }
}
