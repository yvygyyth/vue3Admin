import { ViewNames } from '@/types/constants'

export default {
  path: '/software',
  name: ViewNames.list,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true
  },
  children: [
    {
      path: 'version',
      name: ViewNames.workplace,
      component: () => import('@/views/software/version/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*']
      }
    },

    {
      path: 'monitor',
      name: ViewNames.monitor,
      component: () => import('@/views/software/version/index.vue'),
      meta: {
        locale: 'menu.dashboard.monitor',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}
