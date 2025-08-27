import { useRequestor, requestExtender } from '@net-vert/core'
import type { softwareType, SaveVersion, Version, SearchVersion } from './type'

const request = useRequestor()

const { requestor } = requestExtender.syncRequestor()

export const getSoftTypeList = () => requestor.get<softwareType[]>('/apps')

export const saveVersion = (data: SaveVersion) => request.post<Promise<Version>>('/versions/save', data)

export const getVersionList = (data?: SearchVersion) => request.post<Promise<Version[]>>('/versions/query', data)

export const deleteVersion = (id: number) => request.delete(`/versions/delete/${id}`)

export * from './type'