import { agentList, matterList, payChattList, costTypeList } from '@/api/free/index'
import type { CacheDataOptions } from './type'
import type { ListRes as OtherCostLR } from '@/api/costType/type'
export const cacheJson: Record<string, CacheDataOptions<any, any>> = {
  costTypeList: {
    fetchFunction: costTypeList,
    transform: (res: OtherCostLR) => {
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
