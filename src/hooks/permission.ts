import { useUserStore } from '@/store'
import { cloneDeep, get } from 'lodash'
import type {
  RouteLocationNormalizedLoaded,
  RouteRecordNormalized,
  RouteRecordRaw
} from 'vue-router'
import type { JSX } from 'vue/jsx-runtime'

export type PermissionRender = {
  permission: string | string[]
  render: (...arg: any[]) => JSX.Element
}

export default function usePermission() {
  const userStore = useUserStore()
  const checkRoutePermission = (
    route: RouteRecordRaw | RouteRecordNormalized | RouteLocationNormalizedLoaded
  ) => {
    const requiresAuth = get(route, 'meta.requiresAuth')
    const needRoles = (get(route, 'meta.roles') || []) as string[]
    return (
      !requiresAuth ||
      needRoles.length === 0 ||
      needRoles.includes('*') ||
      needRoles.includes(userStore.role)
    )
  }
  const checkButtonPermission = (needPermission: string[] | string) => {
    if (!Array.isArray(needPermission)) {
      needPermission = [needPermission]
    }
    if (needPermission.includes('*')) {
      return true
    }
    const userStore = useUserStore()
    return needPermission.includes(userStore.role)
  }

  return {
    checkRoutePermission,
    checkButtonPermission
  }
}
