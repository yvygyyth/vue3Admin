import { ViewNames } from '@/types/constants'

export default {
    path: '/software',
    name: ViewNames.software,
    component: () => import('@/components/layout-component/index'),
    meta: {
        locale: 'menu.software',
        requiresAuth: true
    },
    children: [
        {
            path: 'app',
            name: 'software-app',
            component: () => import('@/views/software/app/index.vue'),
            meta: {
                locale: 'menu.software.app',
                requiresAuth: true,
                roles: ['*']
            }
        },
        {
            path: 'version',
            name: 'software-version',
            component: () => import('@/views/software/version/index.vue'),
            meta: {
                locale: 'menu.software.version',
                requiresAuth: true,
                roles: ['*']
            }
        }
    ]
}
