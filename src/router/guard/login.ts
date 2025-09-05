import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { ViewNames } from '@/types/constants'
import useAuth from '@/hooks/auth'
import { DependencyHub, Keys } from "@/hooks/useRequestInjectorManager";

/**
 *
 * @desc userInfo and token guard
 * - no token to login view
 * - has token check userInfo
 * - - has userInfo go
 * - - no userInfo update info go
 */
export default function setupUserLoginInfoGuard(router: Router) {
  console.log('路由登录校验')
  const { logoutApp } = useAuth()
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    const token = await DependencyHub.getAndCall(Keys.getToken);
    if (token) {
      if (token) {
        next()
      } else {
        try {
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
