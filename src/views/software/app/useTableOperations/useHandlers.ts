import { openSaveForm } from '../useTableModal/index'
import type { softwareType } from '@/api/software'
import { deleteSoftType } from '@/api/software'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'
import { Message } from '@arco-design/web-vue'

export const useHandlers = () => {

    const editOk = async(data: softwareType) => {
        try {
            await openSaveForm(data)
            eventBus.emit(REFRESH_LIST_EVENT)
            Message.success('编辑成功')
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    const deleteOk = async(data: softwareType) => {
        try {
            await deleteSoftType(data.id)
            eventBus.emit(REFRESH_LIST_EVENT)
            Message.success('删除成功')
        } catch (error) {
            console.error('删除操作失败:', error)
        }
    }

    return {
        editOk,
        deleteOk
    }
}
