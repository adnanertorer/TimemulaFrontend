import { PageRequest } from "./page.request";

export type DeptCollectionFilterModel = {
    customerId: number;
    cashBoxId: number;
    startDate: Date;
    endDate: Date;
}

export type PageRequestWithDebtCollectionFilter = {
    pageRequest: PageRequest;
    filter: DeptCollectionFilterModel;
}