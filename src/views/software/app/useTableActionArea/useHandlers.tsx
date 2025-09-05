import { openSaveForm } from '../useTableModal/index'
import { Message } from '@arco-design/web-vue'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'

export const useHandlers = () => {

    const addOk = async() => {
        try {
            await openSaveForm()
            Message.success('新增成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    return {
        addOk
    }
}
