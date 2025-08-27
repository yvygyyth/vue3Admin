// Vue JSX 类型扩展
import { DefineComponent, VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends DefineComponent {}
    
    // 让所有组件都支持 v-model
    interface IntrinsicAttributes {
      'v-model'?: any
      'v-show'?: boolean
      'v-if'?: boolean
      key?: string | number | symbol
      ref?: any
      [key: string]: any
    }
    
    // 扩展元素属性
    interface ElementAttributesProperty {
      $props: any
    }
    
    interface ElementChildrenAttribute {
      $slots: any
    }
  }
}

// 扩展 Vue 组件类型，让所有组件都支持 v-model
declare module 'vue' {
  interface ComponentCustomProperties {
    [key: string]: any
  }
  
  interface AllowedComponentProps {
    'v-model'?: any
    [key: string]: any
  }
}

export {}
