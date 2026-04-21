export declare interface Qrud {
    getList(): void;
    onChangePage(pageOfItems: Array<any>): void;
    getDetailFromTable(resource: any): void;
    add(): void;
    remove(id:number):void;
    reset(): void;
}
