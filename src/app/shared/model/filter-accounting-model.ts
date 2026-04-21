export interface FilterAccountingModel {
    customerId: number;
    transactionTypeId: number;
    startTime?: Date;
    finishTime?: Date;
    customerType: number;
}
