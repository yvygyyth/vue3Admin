import { openSaveForm } from '../useTableModal'
import type { Version } from '@/api/software'
import { deleteVersion } from '@/api/software'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'

export const useHandlers = () => {

    const editOk = async(data: Version) => {
        try {
            await openSaveForm(data)
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    const deleteOk = async(data: Version) => {
        try {
            await deleteVersion(data.id)
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            console.error('删除操作失败:', error)
        }
    }

    return {
        editOk,
        deleteOk
    }
}