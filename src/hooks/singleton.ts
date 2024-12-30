function arraysAreEqual(arr1: any[], arr2: any[]): boolean {
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

export const singleton = (className: new (...args: any[]) => any) => {
  let instance: any
  let lastParams: any[] = []

  return new Proxy(className, {
    construct(target, args) {
      if (instance) {
        if (!arraysAreEqual(lastParams, args)) {
          throw new Error('Singleton instance already created with different parameters!')
        }
        return instance
      }

      instance = Reflect.construct(target, args)
      lastParams = [...args]
      return instance
    }
  })
}
