import { openSaveForm } from '../useTableModal'
import { Message } from '@arco-design/web-vue'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'
import type { Secret } from '@/api/secret'

export const useHandlers = () => {

    const editOk = async(record: Secret) => {
        try {
            await openSaveForm(record)
            Message.success('编辑密钥成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            // 用户取消操作，静默处理
        }
    }

    return {
        editOk
    }
}
