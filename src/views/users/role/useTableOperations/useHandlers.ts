import { openSaveForm } from '../useTableModal/index'
import { Message } from '@arco-design/web-vue'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'
import { deleteRole, type RoleWithPermissions } from '@/api/role'

export const useHandlers = () => {

    const editOk = async(record: RoleWithPermissions) => {
        try {
            await openSaveForm(record)
            Message.success('编辑角色成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    const deleteOk = async(record: RoleWithPermissions) => {
        try {
            await deleteRole(record.id)
            Message.success('删除角色成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            Message.error('删除角色失败')
            console.error('删除操作失败:', error)
        }
    }

    return {
        editOk,
        deleteOk
    }
}
