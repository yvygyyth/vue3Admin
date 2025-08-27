import { createI18n } from 'vue-i18n'
import persistenceStore from '@/utils/localStorage'
import { LS } from '@/utils/localStorage/http'
import { LocaleOptions } from '@/types/constants'
import { get } from 'lodash'

const localStore = new persistenceStore()
const defaultLocale = localStore.get(LS.locale) || LocaleOptions.cn

const getMessageFromModules = (_moduleMap: Record<string, unknown>) => {
  const ret = {}
  for (const key in _moduleMap) {
    const exportContent = get(_moduleMap[key], 'default')
    if (exportContent) {
      Object.assign(ret, exportContent)
    }
  }
  return ret
}
const cnMessages = getMessageFromModules(import.meta.glob('./zh-CN/*.json', { eager: true }))
const enMessages = getMessageFromModules(import.meta.glob('./en-US/*.json', { eager: true }))

const i18n = createI18n({
  locale: defaultLocale as string,
  fallbackLocale: LocaleOptions.cn,
  legacy: false,
  allowComposition: true,
  messages: {
    [LocaleOptions.en]: enMessages,
    [LocaleOptions.cn]: cnMessages
  }
})

export default i18n
