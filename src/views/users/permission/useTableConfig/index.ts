export const useTableConfig = () => {
    const rowKey = 'id'
    const scrollbar = false
    const scroll = { x: 'max-content' }
    const hideExpandButtonOnEmpty = true

    return {
        rowKey,
        scrollbar,
        scroll,
        hideExpandButtonOnEmpty
    }
}