import { ViewNames } from '@/types/constants'

export default {
  path: '/user',
  name: ViewNames.user,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.user',
    icon: 'icon-user',
    requiresAuth: true
  },
  children: [
    {
      path: 'info',
      name: ViewNames.info,
      component: () => import('@/views/user/info/index'),
      meta: {
        locale: 'menu.user.info',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
