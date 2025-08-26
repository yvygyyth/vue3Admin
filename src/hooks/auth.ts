import { login, type LoginData } from '@/api/user'
import { removeRouteListener } from '@/utils/routerListener'
import { useUserStore } from '@/store'
/**
 *
 * @desc system authentication
 */
export default function useAuth() {
  const userStore = useUserStore()
  const loginApp = async (loginData: LoginData) => {
    try {
      const res = await login(loginData)
      const { token } = res
      userStore.setToken(token)
    } catch (err) {
      throw err
    }
  }

  const logoutApp = async () => {
    removeRouteListener()
  }

  return {
    loginApp,
    logoutApp
  }
}
