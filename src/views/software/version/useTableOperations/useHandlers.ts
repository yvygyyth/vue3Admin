import { openSaveForm } from '../useTableModal'
import type { Version } from '@/api/software'
import { deleteVersion } from '@/api/software'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from '../constants'

export const useHandlers = () => {

    const editOk = async(data: Version) => {
        await openSaveForm(data)
        eventBus.emit(REFRESH_LIST_EVENT)
    }

    const deleteOk = async(data: Version) => {
        await deleteVersion(data.id)
        eventBus.emit(REFRESH_LIST_EVENT)
    }

    return {
        editOk,
        deleteOk
    }
}