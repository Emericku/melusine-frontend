export interface Page<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalPages: number;
    first: boolean;
    last: boolean;
}

export class PageRequest {

    constructor(public page = 0, public size = 20) {
    }

    public previous(): PageRequest {
        return new PageRequest(this.page - 1, this.size);
    }

    public next(): PageRequest {
        return new PageRequest(this.page + 1, this.size);
    }

    public toString(): string {
        return `?page=${this.page}&size=${this.size}`;
    }

}
