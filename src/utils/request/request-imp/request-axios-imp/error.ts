import { eventBus, EventTypes } from '../../request-side-effect'

const eventEmitter = new eventBus()
export const errorHandling = (code: number, msg: string) => {
  if (code >= 400) {
    if (code > 500) {
      eventEmitter.emit(EventTypes.REQUEST_ERROR)
    } else if (code === 500) {
      eventEmitter.emit(EventTypes.RESPONSE_500)
    } else if (code === 401) {
      eventEmitter.emit(EventTypes.AUTH_UNAUTHORIZED)
    } else if (code === 403) {
      eventEmitter.emit(EventTypes.AUTH_FORBIDDEN)
    } else if (code === 404) {
      eventEmitter.emit(EventTypes.RESPONSE_404)
    }
  }
}
