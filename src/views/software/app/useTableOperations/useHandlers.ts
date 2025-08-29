import { openSaveForm } from '../useTableModal/index'
import type { softwareType } from '@/api/software'
import { deleteSoftType } from '@/api/software'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'
import { Message } from '@arco-design/web-vue'

export const useHandlers = () => {

    const editOk = async(data: softwareType) => {
        await openSaveForm(data)
        eventBus.emit(REFRESH_LIST_EVENT)
        Message.success('编辑成功')
    }

    const deleteOk = async(data: softwareType) => {
        await deleteSoftType(data.id)
        eventBus.emit(REFRESH_LIST_EVENT)
        Message.success('删除成功')
    }

    return {
        editOk,
        deleteOk
    }
}
