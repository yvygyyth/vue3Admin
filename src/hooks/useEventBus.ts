type key = string | number
class EventBus {
  events: Record<key, Set<(...arg: any[]) => void>> = {}
  on(eventName: key, callback: () => void) {
    ;(this.events[eventName] ??= new Set()).add(callback)
  }
  emit(eventName: key, ...args: any[]) {
    this.events[eventName]?.forEach((callback) => callback(...args))
  }
  off(eventName: key, callback: () => void) {
    this.events[eventName]?.delete(callback)
  }
  once(eventName: key, callback: (...args: any[]) => void) {
    const wrappedCallback = (...args: any[]) => {
      callback(...args)
      this.off(eventName, wrappedCallback)
    }
    this.on(eventName, wrappedCallback)
  }
}

export default EventBus
