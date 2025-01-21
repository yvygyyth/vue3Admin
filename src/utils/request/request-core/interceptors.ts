import type { Requestor } from './type'

const requestorHandle = {
  get(target: Requestor, prop: keyof Requestor) {
    console.log('前置拦截', prop)
    return Reflect.get(target, prop)
  }
}

export { requestorHandle }
