import { simpleHash } from '@/utils'

type Key = string | number | symbol

// 事件类型，事件类型为对象结构
export type EventType = Record<Key, unknown>

// 事件处理器
export type Handler<T = unknown> = (event: T) => void

// 事件处理器列表
export type EventHandlerList<T = unknown> = Map<string, Handler<T>>

// 事件处理器映射的Map结构
// Map[事件名, 事件处理器列表]
export type EventHandlerMap<Events extends EventType> = Map<
  keyof Events,
  EventHandlerList<Events[keyof Events]>
>

// 继承自原始的 EventBus
class HashEventBus<Events extends EventType> {
  all: EventHandlerMap<Events>

  constructor(all?: EventHandlerMap<Events>) {
    this.all = all || new Map()
  }

  // 重写注册事件的 on 方法
  on<K extends keyof Events>(eventName: K, handler: Handler<Events[K]>) {
    const hash = this.getFunctionHash(handler)
    const handlersMap = this.all.get(eventName) || new Map()

    if (!handlersMap.has(hash)) {
      handlersMap.set(hash, handler)
      this.all.set(eventName, handlersMap) // 将新的 map 更新到 all 中
    }
  }

  // 重写触发事件的 emit 方法
  emit<K extends keyof Events>(eventName: K, args: Events[keyof Events]) {
    const handlersMap = this.all.get(eventName)
    if (handlersMap) {
      handlersMap.forEach((handler) => handler(args))
    }
  }

  // 重写注销事件的 off 方法
  off<K extends keyof Events>(eventName: K, handler?: Handler<Events[K]>) {
    const handlersMap = this.all.get(eventName)
    if (handlersMap) {
      if (handler) {
        const hash = this.getFunctionHash(handler)
        handlersMap.delete(hash) // 删除指定的 handler
      } else {
        this.all.delete(eventName) // 移除所有处理器
      }
    }
  }

  // 重写只执行一次的事件处理器 once 方法
  once<K extends keyof Events>(eventName: K, handler: Handler<Events[K]>) {
    const wrappedCallback = (args: Events[K]) => {
      handler(args)
      this.off(eventName, wrappedCallback) // 执行后移除事件处理器
    }
    this.on(eventName, wrappedCallback) // 注册一次性事件处理器
  }

  // 获取函数的哈希值
  private getFunctionHash(fn: Function): string {
    return simpleHash(fn)
  }
}

export default HashEventBus
