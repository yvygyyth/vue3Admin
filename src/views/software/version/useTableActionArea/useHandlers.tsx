import { openSaveForm } from '../useTableModal'
import { Message } from '@arco-design/web-vue'

export const useHandlers = () => {

    const addOk = async() => {
        await openSaveForm()
        Message.success('新增成功')
    }

    return {
        addOk
    }
}