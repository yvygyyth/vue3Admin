import { ViewNames } from '@/types/constants'

export default {
    path: '/users',
    name: ViewNames.users,
    component: () => import('@/components/layout-component/index'),
    meta: {
        locale: 'menu.users',
        requiresAuth: true
    },
    children: [
        {
            path: 'permission',
            name: ViewNames.permission,
            component: () => import('@/views/users/permission/index.vue'),
            meta: {
                locale: 'menu.users.permission',
                requiresAuth: true,
                roles: ['*']
            }
        }
    ]
}
