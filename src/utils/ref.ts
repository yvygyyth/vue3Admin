// createRangeComputed.ts
import { computed, type ComputedRef, type Ref, type WritableComputedRef } from 'vue'

/**
 * 创建一个范围计算属性，用于处理对象中任意两个键的值，并进行转换
 * @param obj - 目标对象的引用（Ref 或 Reactive）
 * @param startKey - 起始键
 * @param endKey - 结束键
 * @param transformGet - 获取时的转换函数，默认为原值
 * @param transformSet - 设置时的转换函数，默认为原值
 * @returns ComputedRef<[TStart, TEnd]>
 */
export function createRangeComputed<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T,
  TStart = T[K1],
  TEnd = T[K2]
>(
  obj: Ref<T> | T,
  startKey: K1,
  endKey: K2,
  transformGet: (start: T[K1], end: T[K2]) => [TStart, TEnd] = (start, end) => [
    ((start as number) * 1000) as TStart,
    ((end as number) * 1000) as TEnd
  ],
  transformSet: (value: [TStart, TEnd]) => { start: T[K1]; end: T[K2] } = (value) => ({
    start: ((value[0] as number) / 1000) as T[K1],
    end: ((value[1] as number) / 1000) as T[K2]
  })
): WritableComputedRef<[TStart, TEnd]> {
  return computed<[TStart, TEnd]>({
    get() {
      const start = 'value' in obj ? obj.value[startKey] : obj[startKey]
      const end = 'value' in obj ? obj.value[endKey] : obj[endKey]
      return transformGet(start, end)
    },
    set(value) {
      if (!Array.isArray(value) || value.length !== 2) {
        value = [void 0 as unknown as TStart, void 0 as unknown as TEnd]
      }

      const { start, end } = transformSet(value)
      if ('value' in obj) {
        obj.value[startKey] = start
        obj.value[endKey] = end
      } else {
        obj[startKey] = start
        obj[endKey] = end
      }
    }
  })
}
