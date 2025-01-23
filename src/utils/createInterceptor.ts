type InterceptorFunction<T> = (data: T) => T | Promise<T>

interface Interceptor<T> {
  before?: InterceptorFunction<T>
  after?: InterceptorFunction<T>
}

export class createInterceptor<T> {
  private interceptors: Interceptor<T>[] = []

  // 添加拦截器
  use(interceptor: Interceptor<T>): void {
    this.interceptors.push(interceptor)
  }

  // 执行拦截器链
  async run(data: T): Promise<T> {
    let modifiedData = data

    // 执行 before 拦截器
    for (const interceptor of this.interceptors) {
      if (interceptor.before) {
        modifiedData = await interceptor.before(modifiedData)
      }
    }

    // 执行主逻辑（可以替换为请求操作）
    let response = await this.executeRequest(modifiedData)

    // 执行 after 拦截器
    for (const interceptor of this.interceptors) {
      if (interceptor.after) {
        response = await interceptor.after(response)
      }
    }

    return response
  }

  // 这里模拟主业务逻辑的执行
  private async executeRequest(data: T): Promise<T> {
    console.log('Executing main process with data:', data)
    return data // 可以在这里替换为实际的请求处理逻辑
  }
}

// 示例使用
// const interceptorManager = new createInterceptor<{ url: string; headers?: Record<string, string> }>();

// // 添加 before 拦截器
// interceptorManager.use({
//   before: async (data) => {
//     console.log("Before拦截:", data);
//     if (data.url.includes("cached")) {
//       throw new Error("请求被拦截：缓存命中");
//     }
//     data.headers = { ...data.headers, Authorization: "Bearer token" };
//     return data;
//   },
//   after: async (response) => {
//     console.log("After拦截:", response);
//     response.url += "?timestamp=" + Date.now();
//     return response;
//   }
// });

// // 执行拦截器
// interceptorManager
//   .run({ url: "/api/user" })
//   .then((result) => console.log("最终结果:", result))
//   .catch((error) => console.error("拦截错误:", error));
