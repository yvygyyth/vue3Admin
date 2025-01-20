import EventBus from '@/hooks/useEventBus'
import { singleton } from '@/utils/singleton'
import { EventTypes } from './EventTypes'
import { Message, Modal } from '@arco-design/web-vue'
import type { EventPayloads } from './EventTypes'

export const eventBus = singleton<typeof EventBus<EventPayloads>>(EventBus)

export const sideEffectInit = () => {
  const eventEmitter = new eventBus()
  eventEmitter.on(EventTypes.REQUEST_ERROR, () => Message.error('请求错误'))
  eventEmitter.on(EventTypes.AUTH_UNAUTHORIZED, () => Message.error('未登录'))
  eventEmitter.on(EventTypes.AUTH_FORBIDDEN, () => Message.error('权限不足'))
  eventEmitter.on(EventTypes.RESPONSE_500, ({ message }) => Message.error('服务器未响应'))

  eventEmitter.on(EventTypes.NOTIFICATION_INFO, ({ message }) => Message.error(message || '提示'))
  eventEmitter.on(EventTypes.NOTIFICATION_ERROR, ({ message }) => Message.error(message || '错误'))
  eventEmitter.on(EventTypes.NOTIFICATION_WARNING, ({ message }) =>
    Message.error(message || '警告')
  )
}

export { EventTypes }
