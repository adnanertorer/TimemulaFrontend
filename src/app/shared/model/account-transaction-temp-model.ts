export interface AccountTransactionTempModel {
    id: number;
    transactionType: number;
    debt: number;
    claim: number;
    balance: number;
    relatingId: string;
    createdAt: Date;
    createdBy: number;
    unicKey: string;
    personType: number;
}
