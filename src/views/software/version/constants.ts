import type { SearchVersion } from '@/api/software'

export const REFRESH_LIST_EVENT = 'software:version:refresh'

export const defaultSearchForm:SearchVersion = {
    app_id: void 0,
    page:1,
    limit:10
}