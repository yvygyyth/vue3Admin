import ListRoutes from '@/router/routes/modules/list'
import { computed, toRaw } from 'vue'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { type AppRouteRecordRaw } from '@/router/routes/types'
function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })
  return result
}
//const appRoutes = formatModules()
const appClientMenus = [...[ListRoutes]]

export default function useMenuTree() {
  // const permission = usePermission()
  // const appStore = useAppStore()
  const appRoute = computed(() => {
    // if (appStore.menuFromServer) {
    //   return appStore.appAsyncMenus
    // }
    return appClientMenus
  })

  const menuTree = computed(() => {
    const copyRouter = structuredClone(appRoute.value) as RouteRecordRaw[]
    copyRouter.sort((a, b) => {
      return ((a.meta!.order as number) || 0) - ((b.meta!.order as number) || 0)
    })
    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes) return null

      const collector: any = _routes.map((element) => {
        // no access
        // if (!permission.accessRouter(element)) {
        //   return null
        // }

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = []
          return element
        }

        // route filter hideInMenu true
        element.children = element.children.filter((x) => x.meta?.hideInMenu !== true)

        // Associated child node
        const subItem = travel(element.children, layer + 1)

        if (subItem.length) {
          element.children = subItem
          return element
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem
          return element
        }

        if (element.meta?.hideInMenu === false) {
          return element
        }

        return null
      })
      return collector.filter(Boolean)
    }
    return travel(copyRouter, 0)
  })

  return {
    menuTree
  }
}