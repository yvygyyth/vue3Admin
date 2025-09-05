import { openEditForm, openSetRolesForm } from '../useTableModal/index'
import { Message } from '@arco-design/web-vue'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'
import { deleteUser, type User } from '@/api/account'

export const useHandlers = () => {

    const editOk = async(record: User) => {
        try {
            await openEditForm(record)
            Message.success('编辑用户成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    const setRolesOk = async(record: User) => {
        try {
            await openSetRolesForm(record)
            Message.success('设置角色成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    const deleteOk = async(record: User) => {
        try {
            await deleteUser(record.id)
            Message.success('删除用户成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            Message.error('删除用户失败')
            console.error('删除操作失败:', error)
        }
    }

    return {
        editOk,
        setRolesOk,
        deleteOk
    }
}
