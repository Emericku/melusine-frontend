export default interface Page<MODEL> {
    content: MODEL[];
    pageable?: {
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        pageNumber: number,
        pageSize: number,
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    totalPages?: number,
    totalElements?: number,
    last?: boolean,
    numberOfElements?: number,
    first?: boolean,
    number?: number,
    sort?: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    },
    size: number,
    empty?: boolean
}
