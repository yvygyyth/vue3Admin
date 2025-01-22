import { simpleHash } from '@/utils'

type Key = string | number | symbol

type Params = unknown[] | void

// 事件类型，事件类型为对象结构
export type EventType = Record<Key, Params>

// 事件处理器
export type Handler<T extends Params> = T extends [...infer Args]
  ? (...args: Args) => any
  : () => any

// 事件处理器列表
export type EventHandlerList<T extends Params> = Map<Key, Handler<T>>

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
  on<K extends keyof Events>(eventName: K, handler: Handler<Events[K]>, key?: Key) {
    const hash = key || this.getFunctionHash(handler)
    const handlersMap = this.all.get(eventName) || new Map()

    if (!handlersMap.has(hash)) {
      handlersMap.set(hash, handler)
      this.all.set(eventName, handlersMap)
    }
  }

  // 重写触发事件的 emit 方法
  emit<K extends keyof Events>(eventName: K): void
  emit<K extends keyof Events>(
    eventName: K,
    ...args: Events[K] extends void ? [] : [Events[K]]
  ): void
  emit<K extends keyof Events>(eventName: K, ...rawArgs: any[]) {
    const handlersMap = this.all.get(eventName)
    if (handlersMap) {
      const args = rawArgs.length > 0 ? rawArgs : []
      handlersMap.forEach((handler) => handler(...args))
    }
  }

  // 重写注销事件的 off 方法
  off<K extends keyof Events>(eventName: K, key: Key): void
  off<K extends keyof Events>(eventName: K, handler: Handler<Events[K]>): void
  off<K extends keyof Events>(eventName: K, param: Key | Handler<Events[K]>): void {
    const handlersMap = this.all.get(eventName)
    if (!handlersMap) {
      return
    }
    if (typeof param === 'function') {
      const hash = this.getFunctionHash(param)
      handlersMap.delete(hash)
    } else {
      handlersMap.delete(param)
    }
    if (handlersMap.size === 0) {
      this.all.delete(eventName)
    }
  }

  // 重写只执行一次的事件处理器 once 方法
  once<K extends keyof Events>(eventName: K, handler: Handler<Events[K]>, key?: Key) {
    const wrappedCallback = (args?: Events[K] extends void ? [] : Events[K]) => {
      handler(args)
      if (key !== undefined) {
        this.off(eventName, key)
      } else {
        this.off(eventName, wrappedCallback as Handler<Events[K]>)
      }
    }
    this.on(eventName, wrappedCallback as Handler<Events[K]>, key)
  }

  // 获取函数的哈希值
  private getFunctionHash(fn: Function): string {
    return simpleHash(fn)
  }
}

export default HashEventBus
