import { PageRequest } from "./page.request";

export type AccountTransactionFilter = {
    customerId: number;
    customerType: number;
    transactionTypeId: number;
    startTime: Date;
    finishTime: Date;
}

export type AccountTransactionWithFilterRequest = {
    filterAccounting: AccountTransactionFilter;
    pageRequest: PageRequest;
}