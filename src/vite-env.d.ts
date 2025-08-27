/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 让所有 Vue 组件都支持任意 props，包括 v-model
  const component: DefineComponent<any, any, any> & {
    [K in `v-${string}`]: any
  } & {
    [key: string]: any
  }
  export default component
}

declare module '*.json' {
  const value: { [key: string]: any }
  export default value
}

declare module 'js-md5'

// 为 JSX 添加 v-model 支持
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      'v-model'?: any
      [key: string]: any
    }
    
    // 扩展所有元素的属性，让 v-model 可以被接受
    interface ElementAttributesProperty {
      $props: {}
    }
  }
}