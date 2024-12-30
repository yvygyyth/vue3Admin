type Key = string | number
class EventBus {
  events: Record<Key, Set<(...arg: any[]) => void>> = {}
  on(eventName: Key, callback: () => void) {
    ;(this.events[eventName] ??= new Set()).add(callback)
  }
  emit(eventNames: Key | Key[], ...args: any[]) {
    const eventsToEmit = Array.isArray(eventNames) ? eventNames : [eventNames]
    eventsToEmit.forEach((eventName) => {
      this.events[eventName]?.forEach((callback) => callback(...args))
    })
  }
  off(eventName: Key, callback: () => void) {
    this.events[eventName]?.delete(callback)
  }
  once(eventName: Key, callback: (...args: any[]) => void) {
    const wrappedCallback = (...args: any[]) => {
      callback(...args)
      this.off(eventName, wrappedCallback)
    }
    this.on(eventName, wrappedCallback)
  }
}

export default EventBus
