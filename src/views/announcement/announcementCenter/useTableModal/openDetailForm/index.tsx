import { Modal } from '@arco-design/web-vue'
import { h } from 'vue'
import DetailModal from './DetailModal/index.vue'
import type { Announcement } from '@/api/announcement'

export const openDetailForm = (record: Announcement) => {
    Modal.open({
        title: '公告详情',
        content: () => h(DetailModal, { record }),
        width: 800,
        footer: false,
        modalClass: 'announcement-detail-modal'
    })
}

