/**
 * 全局类型声明：让 v-model 与 modelValue 对齐
 */

declare global {
  namespace JSX {
    // 扩展 IntrinsicAttributes，让所有 JSX 元素都支持 v-model
    interface IntrinsicAttributes {
      'v-model'?: any
      [key: string]: any
    }
    
    // 重写 ElementAttributesProperty，让 TypeScript 正确处理 props
    interface ElementAttributesProperty {
      $props: any
    }
  }
}

// 扩展 Vue 的类型系统
declare module 'vue' {
  // 让所有组件的 AllowedComponentProps 都支持 v-model
  interface AllowedComponentProps {
    'v-model'?: any
    [key: string]: any
  }
  
  // 扩展 VNodeProps 以支持 v-model
  interface VNodeProps {
    'v-model'?: any
    [key: string]: any
  }
  
  // 扩展 ComponentCustomProps 以支持 v-model
  interface ComponentCustomProps {
    'v-model'?: any
    [key: string]: any
  }
}

export {}
