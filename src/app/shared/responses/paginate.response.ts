export type PaginateResponse<T> = {
    success: boolean;
    message: string;
    clientMessage: string;
    dynamicClass: PaginateDynamicClass<T>;
}

export type PaginateDynamicClass<T> = {
    items: T[];
    size: number;
    index: number;
    count: number;
    pages: number;
}
