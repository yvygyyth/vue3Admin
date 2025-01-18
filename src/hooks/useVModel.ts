import { computed, type ComputedRef } from 'vue'

export const useVModel = <P, K extends keyof P & string>(
  props: P,
  emit: (event: `update:${K}`, value: P[K]) => void,
  propsName: K
): ComputedRef<P[K]> => {
  return computed<P[K]>({
    get() {
      return props[propsName]
    },
    set(value: P[K]) {
      if (typeof value === 'object' && value !== null) {
        return new Proxy(value, {
          set(target, prop, val) {
            emit(`update:${propsName}`, { ...target, [prop]: val })
            return true
          }
        })
      } else {
        emit(`update:${propsName}`, value)
      }
    }
  })
}
