import { ViewNames } from '@/types/constants'

export default {
  path: '/software',
  name: ViewNames.list,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.software',
    requiresAuth: true
  },
  children: [
    {
      path: 'version',
      name: ViewNames.workplace,
      component: () => import('@/views/software/version/index.vue'),
      meta: {
        locale: 'menu.software.version',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
