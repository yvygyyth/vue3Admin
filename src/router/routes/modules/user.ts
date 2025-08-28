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
      path: 'setting',
      name: ViewNames.setting,
      component: () => import('@/views/user/setting/index'),
      meta: {
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
