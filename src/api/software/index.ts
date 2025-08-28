import { useRequestor, requestExtender } from '@net-vert/core'
import type { softwareType, SaveVersion, Version, SearchVersion } from './type'

const request = useRequestor()

const { requestor:syncRequestor } = requestExtender.syncRequestor()
const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()

export const getSoftTypeList = () => syncRequestor.get<softwareType[]>('/apps')

export const saveVersion = (data: SaveVersion) => request.post<Promise<Version>>('/apps/versions/save', data)

export const getVersionList = (data?: SearchVersion) => idempotencyRequestor.post<Promise<Version[]>>('/apps/versions/query', data)

export const deleteVersion = (id: number) => request.delete(`/apps/versions/${id}`)

export * from './type'