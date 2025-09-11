import { ViewNames } from '@/types/constants'

export default {
    path: '/announcement',
    name: ViewNames.announcement,
    component: () => import('@/components/layout-component/index'),
    meta: {
        locale: 'menu.announcement',
        requiresAuth: true
    },
    children: [
        {
            path: 'announcementCenter',
            name: 'announcement-secret',
            component: () => import('@/views/announcement/announcementCenter/index.vue'),
            meta: {
                locale: 'menu.announcement.announcementCenter',
                requiresAuth: true,
                roles: ['*']
            }
        }
    ]
}
