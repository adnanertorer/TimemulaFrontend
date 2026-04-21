export interface AccountingTransactionModel {
    id: number;
    transactionType: number;
    debt: number;
    claim: number;
    balance: number;
    relatingId: string;
    createdAt: Date;
    createdBy: number;
    customerId: number;
    personType: number;
    processAt: Date;
}
