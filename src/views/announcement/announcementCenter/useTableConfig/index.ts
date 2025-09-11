export const useTableConfig = () => {
    const scrollbar = false
    const scroll = { x: 2000 }
    const bordered = false
    const columnResizable = true

    return {
        scrollbar,
        scroll,
        bordered,
        columnResizable
    }
}