import { computed, type WritableComputedRef } from 'vue'

export const useVModel = <T>(
  props: Record<string, any>,
  emit: (event: `update:${typeof propsName}`, ...args: any[]) => void,
  propsName: keyof typeof props
): WritableComputedRef<T> => {
  return computed<T>({
    get() {
      return props[propsName]
    },
    set(value: T) {
      if (typeof value === 'object' && value !== null) {
        return new Proxy(props[propsName], {
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
