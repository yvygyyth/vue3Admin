import type { RequiredRequestConfig } from '../request-core/type'

/**
 * 事件类型枚举
 * 用于统一定义所有的事件类型，确保事件名称规范统一且具有一致性。
 * 每个事件都对应一个唯一的字符串标识符。
 */
export enum EventTypes {
  /**
   * 请求错误
   * 通常用于捕获请求过程中发生的错误（如网络错误或服务器错误）。
   */
  REQUEST_ERROR = 'request:error',

  /**
   * 未登录
   * 当请求返回未授权（401）状态码时触发，用于跳转到登录页面。
   */
  AUTH_UNAUTHORIZED = 'auth:unauthorized',

  /**
   * 权限不足
   * 当请求返回权限不足（403）状态码时触发，用于提示用户或跳转到权限错误页面。
   */
  AUTH_FORBIDDEN = 'auth:forbidden',

  /**
   * 响应状态码 404
   * 当请求的资源未找到时触发，用于跳转到 404 页面或显示资源未找到提示。
   */
  RESPONSE_404 = 'response:code:404',

  /**
   * 响应状态码 500
   * 当服务器内部发生错误时触发，用于显示服务器错误提示。
   */
  RESPONSE_500 = 'response:code:500',

  /**
   * 通用通知 - 信息提示
   * 用于显示普通的提示信息（非错误类提示）。
   */
  NOTIFICATION_INFO = 'notification:info',

  /**
   * 通用通知 - 警告提示
   * 用于显示警告类的提示信息。
   */
  NOTIFICATION_WARNING = 'notification:warning',

  /**
   * 通用通知 - 错误提示
   * 用于显示错误类的提示信息。
   */
  NOTIFICATION_ERROR = 'notification:error',

  /**
   * 请求进度
   * 通常用于上传或下载操作，实时更新进度条或状态。
   */
  REQUEST_PROGRESS = 'request:progress',

  /**
   * 注册请求后的事件
   * 通常用于判断请求是否需要发送，比如缓存
   */
  REQUEST_AFTER = 'request:after'
}

/**
 * 默认的事件参数类型
 * 为每个事件类型定义其对应的参数类型。
 * 如果某个事件没有特定的参数需求，可以将其类型设置为 void。
 */
type DefaultEventPayloads = {
  [EventTypes.REQUEST_ERROR]: void
  [EventTypes.AUTH_UNAUTHORIZED]: void
  [EventTypes.AUTH_FORBIDDEN]: void
  [EventTypes.RESPONSE_404]: [{ url: string }]
  [EventTypes.RESPONSE_500]: [{ message: string }]
  [EventTypes.NOTIFICATION_INFO]: [{ message: string }]
  [EventTypes.NOTIFICATION_WARNING]: [{ message: string }]
  [EventTypes.NOTIFICATION_ERROR]: [{ message: string }]
  [EventTypes.REQUEST_PROGRESS]: [{ loaded: number; total: number }]
  [EventTypes.REQUEST_AFTER]: [cache: string, data: unknown]
}

/**
 * 自动生成事件参数类型
 * 通过遍历 `DefaultEventPayloads` 自动生成完整的事件参数类型定义。
 * 如果需要新增事件类型及其参数，只需修改 `DefaultEventPayloads`。
 */
export type EventPayloads = {
  [K in keyof DefaultEventPayloads]: DefaultEventPayloads[K]
}
