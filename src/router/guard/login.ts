import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/store'
import persistenceStore from '@/utils/localStorage'
import { LS } from '@/utils/localStorage/http'
import { ViewNames } from '@/types/constants'
import useAuth from '@/hooks/auth'

/**
 *
 * @desc userInfo and token guard
 * - no token to login view
 * - has token check userInfo
 * - - has userInfo go
 * - - no userInfo update info go
 */
export default function setupUserLoginInfoGuard(router: Router) {
  const { logoutApp } = useAuth()
  const localStore = new persistenceStore()
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    if (localStore.has(LS.token)) {
      if (userStore.role) {
        next()
      } else {
        try {
          await userStore.refreshUserInfo()
          next()
        } catch (error) {
          await logoutApp()
          next({
            name: ViewNames.login
          })
        }
      }
    } else {
      if (to.name === ViewNames.login) {
        next()
        return
      }
      next({
        name: ViewNames.login
      })
    }
  })
}
