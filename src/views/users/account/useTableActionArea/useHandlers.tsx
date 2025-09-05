import { openAddForm } from '../useTableModal/index'
import { Message } from '@arco-design/web-vue'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'

export const useHandlers = () => {

    const addOk = async() => {
        try {
            await openAddForm()
            Message.success('新增用户成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    return {
        addOk
    }
}
