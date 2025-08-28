import { useSaveForm } from '../useTableModal'

export const useHandlers = () => {

    const addOk = async() => {
        const { open } = useSaveForm()
        open()
    }

    return {
        addOk
    }
}