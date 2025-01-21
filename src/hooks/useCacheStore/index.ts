import persistenceStore from '@/utils/localStorage'

const localStore = new persistenceStore()

const session = new Map()
export const useCacheStore = (persist: boolean) => {
  if (persist) {
    return localStore
  } else {
    return session
  }
}
