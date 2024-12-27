import { singleton } from '@/hooks/singleton'
class EventBus {
  events: Record<string, Set<(...arg: any[]) => void>> = {}
  on(eventName: string, callback: () => void) {
    ;(this.events[eventName] ??= new Set()).add(callback)
  }
  emit(eventName: string, ...args: any[]) {
    this.events[eventName]?.forEach((callback) => callback(...args))
  }
  off(eventName: string, callback: () => void) {
    this.events[eventName]?.delete(callback)
  }
  once(eventName: string, callback: (...args: any[]) => void) {
    const wrappedCallback = (...args: any[]) => {
      callback(...args)
      this.off(eventName, wrappedCallback)
    }
    this.on(eventName, wrappedCallback)
  }
}

export default singleton(EventBus)
