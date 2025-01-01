import { login, logout, type LoginData } from '@/api/user'
import { useUserStore } from '@/store'
import LocalStorageService from '@/utils/localStorage'
import { LS } from '@/utils/localStorage/http'
import { removeRouteListener } from '@/utils/routerListener'
/**
 *
 * @desc system authentication
 */
export default function useAuth() {
  const localStore = new LocalStorageService()
  const loginApp = async (data: LoginData) => {
    try {
      const res = await login(data)
      localStore.set(LS.token, res.data.token)
    } catch (err) {
      localStore.remove(LS.token)
      throw err
    }
  }

  const logoutApp = async () => {
    const userStore = useUserStore()
    const afterLogout = () => {
      userStore.resetUserInfo()
      localStore.remove(LS.token)
      removeRouteListener()
    }
    try {
      await logout()
    } finally {
      afterLogout()
    }
  }
  return {
    loginApp,
    logoutApp
  }
}
