import { openSaveForm } from '../useTableModal'
import type { Version } from '@/api/software'
import { deleteVersion } from '@/api/software'
export const useHandlers = () => {

    const editOk = async(data: Version) => {
        await openSaveForm(data)
    }

    const deleteOk = async(data: Version) => {
        await deleteVersion(data.id)
    }

    return {
        editOk,
        deleteOk
    }
}