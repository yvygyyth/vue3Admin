import { useRequestor, requestExtender } from '@net-vert/core'
import type { softwareType } from './type'
const { requestor } = requestExtender.syncRequestor()


export const getSoftTypeList = () => requestor.get<softwareType[]>('/apps')

export * from './type'