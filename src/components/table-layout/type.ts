import { type TableColumnData } from '@arco-design/web-vue'

export interface ColListType extends TableColumnData {
  getTitle: () => string
  checked: boolean
}

export type TableSize = 'medium' | 'mini' | 'small' | 'large'
