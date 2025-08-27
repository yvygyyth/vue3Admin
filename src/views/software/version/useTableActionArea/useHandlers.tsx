import { useSaveForm } from '../useTableModal'

export const useHandlers = () => {

    const addOk = async() => {
        console.log('addOk')
    }

    return {
        addOk
    }
}