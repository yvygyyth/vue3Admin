import { ViewNames } from '@/types/constants'

export default {
    path: '/setting',
    name: ViewNames.setting,
    component: () => import('@/components/layout-component/index'),
    meta: {
        locale: 'menu.setting',
        requiresAuth: true
    },
    children: [
        {
            path: 'secret',
            name: 'setting-secret',
            component: () => import('@/views/setting/secret/index.vue'),
            meta: {
                locale: 'menu.setting.secret',
                requiresAuth: true,
                roles: ['*']
            }
        }
    ]
}
