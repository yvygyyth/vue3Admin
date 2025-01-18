type Key = string | number | symbol

// 事件类型，事件类型为对象结构
type EventType = Record<Key, unknown>

// 事件处理器
export type Handler<T = unknown> = (event: T) => void

// 事件处理器列表
export type EventHandlerList<T = unknown> = Array<Handler<T>>

// 事件处理器映射的Map结构
// Map[事件名, 事件处理器列表]
export type EventHandlerMap<Events extends EventType> = Map<
  keyof Events,
  EventHandlerList<Events[keyof Events]>
>

// Events为拥有的类型，继承自EventType
// {
//    事件名字:参数
// }

class EventBus<Events extends EventType> {
  all: EventHandlerMap<Events>

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
  emit<K extends keyof Events>(eventName: K, args: Events[keyof Events]) {
    const handlers = this.all.get(eventName)
    if (handlers) {
      handlers
        .slice() // 复制数组，防止修改原数组
        .map((handler) => handler(args))
    }
  }

  // 注销事件处理器
  off<K extends keyof Events>(eventName: K, handler?: Handler<Events[K]>) {
    const handlers = this.all.get(eventName)
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler as Handler<Events[keyof Events]>) >>> 0, 1) // 移除指定处理器
      } else {
        this.all.set(eventName, []) // 移除所有处理器
      }
    }
  }

  // 注册只能触发一次的事件处理器
  once<K extends keyof Events>(eventName: K, handler: Handler<Events[K]>) {
    const wrappedCallback = (args: Events[K]) => {
      handler(args)
      this.off(eventName, wrappedCallback) // 执行后移除事件处理器
    }
    this.on(eventName, wrappedCallback) // 注册一次性事件处理器
  }
}

export default EventBus
