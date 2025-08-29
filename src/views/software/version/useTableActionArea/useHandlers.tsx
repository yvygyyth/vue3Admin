import { openSaveForm } from '../useTableModal'
import { Message } from '@arco-design/web-vue'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'

export const useHandlers = () => {

    const addOk = async() => {
        await openSaveForm()
        Message.success('新增成功')
        eventBus.emit(REFRESH_LIST_EVENT)
    }

    return {
        addOk
    }
}