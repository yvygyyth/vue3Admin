import { useRequestor, requestExtender } from '@net-vert/core'
import type { softwareType, SaveVersion, Version, SearchVersion, SaveAppType } from './type'

const request = useRequestor()

const { requestor:syncRequestor, store:syncStore } = requestExtender.syncRequestor()
const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()

// 软件类型模块
export const getSoftTypeList = () => syncRequestor.get<softwareType[]>('/apps')

const deleteSoftTypeCache = () => {
    syncStore.remove(`/apps`)
}

export const saveSoftType = (data: SaveAppType) => request.post('/apps', data).then(deleteSoftTypeCache)

export const deleteSoftType = (id: number) => request.delete(`/apps/${id}`).then(deleteSoftTypeCache)


// 版本模块
export const saveVersion = (data: SaveVersion) => request.post<Promise<Version>>('/apps/versions/save', data)

export const getVersionList = (data?: SearchVersion) => idempotencyRequestor.post<Promise<Version[]>>('/apps/versions/query', data)

export const deleteVersion = (id: number) => request.delete(`/apps/versions/${id}`)

export * from './type'