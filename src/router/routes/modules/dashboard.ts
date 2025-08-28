import { ViewNames } from '@/types/constants'

export default {
  path: '/dashboard',
  name: ViewNames.dashboard,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true
  },
  children: [
    {
      path: 'workplace',
      name: ViewNames.workplace,
      component: () => import('@/views/dashboard/workplace/index'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
