type Key = string | number | symbol

type Params = unknown[] | void

// 事件类型，事件类型为对象结构
export type EventType = Record<Key, Params>

// 事件处理器，T 应该是参数元组
export type Handler<T extends Params> = T extends [...infer Args]
  ? (...args: Args) => any
  : () => any

// 事件处理器列表
export type EventHandlerList<T extends Params> = Array<Handler<T>>

// 事件处理器映射的Map结构
// Map[事件名, 事件处理器列表]
export type EventHandlerMap<Events extends EventType> = Map<
  keyof Events,
  EventHandlerList<Events[keyof Events]>
>

// 事件总线类
class EventBus<Events extends EventType> {
  private all: EventHandlerMap<Events>

  constructor(all?: EventHandlerMap<Events>) {
    this.all = all || new Map()
  }

  // 注册事件处理器
  on<K extends keyof Events>(eventName: K, handler: Handler<Events[K]>) {
    const handlers = this.all.get(eventName)
    if (handlers) {
      handlers.push(handler as Handler<Events[keyof Events]>)
    } else {
      this.all.set(eventName, [handler as Handler<Events[keyof Events]>])
    }
  }

  // 触发事件
  emit<K extends keyof Events>(eventName: K): void
  emit<K extends keyof Events>(
    eventName: K,
    ...args: Events[K] extends void ? [] : [Events[K]]
  ): void
  emit<K extends keyof Events>(eventName: K, ...rawArgs: any[]) {
    const handlers = this.all.get(eventName)
    if (handlers) {
      // 处理 void 类型的情况
      const args = rawArgs.length > 0 ? rawArgs : []
      handlers.slice().forEach((handler) => handler(...args))
    }
  }

  // 注销事件处理器
  off<K extends keyof Events>(eventName: K, handler?: Handler<Events[K]>) {
    const handlers = this.all.get(eventName)
    if (handlers) {
      if (handler) {
        const index = handlers.indexOf(handler as Handler<Events[keyof Events]>)
        if (index !== -1) handlers.splice(index, 1)
      } else {
        this.all.set(eventName, [])
      }
    }
  }

  // 注册只能触发一次的事件处理器
  once<K extends keyof Events>(eventName: K, handler: Handler<Events[K]>) {
    const wrappedHandler = (...args: Events[K] extends void ? [] : [Events[K]]) => {
      handler(...args)
      this.off(eventName, wrappedHandler as Handler<Events[K]>)
    }
    this.on(eventName, wrappedHandler as Handler<Events[K]>)
  }
}

export default EventBus
