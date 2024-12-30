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
