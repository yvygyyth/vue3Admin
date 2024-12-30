import { agentList, matterList, payChattList, costTypeList } from '@/api/free/index'
import { type SelectOptionData } from '@arco-design/web-vue'
import type { CacheDataOptions } from './type'
import { CDK } from './type'
import type { ListRes as OtherCostLR } from '@/api/costType/type'
export const cacheJson: Record<string | number, CacheDataOptions<any, any>> = {
  [CDK.costTypeList]: {
    fetchFunction: costTypeList,
    transform: (res: OtherCostLR): SelectOptionData => {
      const { data } = res
      return data.map((item) => ({
        value: item.id,
        label: item.name
      }))
    },
    params: {
      page: 1,
      limit: -1
    }
  }
}
