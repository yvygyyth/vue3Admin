import { Message } from '@arco-design/web-vue'
import { announcementDeleteApi, type Announcement } from '@/api/announcement'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'
import { useTableModal } from '../useTableModal'

export const useHandlers = () => {
    const { openDetailModal } = useTableModal()

    const viewDetail = (record: Announcement) => {
        openDetailModal(record)
    }

    const deleteOk = async (record: Announcement) => {
        try {
            await announcementDeleteApi(record.id)
            Message.success('删除成功')
            eventBus.emit(REFRESH_LIST_EVENT)
        } catch (error) {
            console.error('删除失败:', error)
            Message.error('删除失败')
        }
    }

    return {
        viewDetail,
        deleteOk
    }
}

