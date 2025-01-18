import { unref, type Ref } from 'vue'
export const getLabelByValue = <T extends Record<string, any>>(
  options: Ref<T[]> | T[],
  value: any,
  keys: { valueKey?: string; labelKey?: string } = {}
): string | undefined => {
  const { valueKey = 'value', labelKey = 'label' } = keys
  const foundOption = unref(options).find((option) => option[valueKey] === value)
  return foundOption ? foundOption[labelKey] : undefined
}

export function simpleHash(fn: Function): string {
  const fnString = fn.toString()
  let hash = 0
  for (let i = 0; i < fnString.length; i++) {
    const char = fnString.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }

  return Math.abs(hash).toString()
}
