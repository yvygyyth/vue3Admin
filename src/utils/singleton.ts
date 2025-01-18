// 泛型构造函数类型
type ClassConstructor = new (...args: any) => any

function arraysAreEqual<U>(arr1: U[], arr2: U[]): boolean {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

export const singleton = <T extends ClassConstructor>(classConstructor: T) => {
  let instance: InstanceType<T>
  let lastParams: ConstructorParameters<T>

  return new Proxy(classConstructor, {
    construct(target, args: ConstructorParameters<T>) {
      if (instance) {
        if (!arraysAreEqual(lastParams, args)) {
          throw new Error('Singleton instance already created with different parameters!')
        }
        return instance
      }

      instance = Reflect.construct(target, args)
      lastParams = args
      return instance
    }
  })
}
