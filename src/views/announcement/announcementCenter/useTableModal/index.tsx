import { ref } from 'vue'
import { openDetailForm } from './openDetailForm'
import type { Announcement } from '@/api/announcement'

export const useTableModal = () => {
    const openDetailModal = (record: Announcement) => {
        openDetailForm(record)
    }

    return {
        openDetailModal
    }
}

