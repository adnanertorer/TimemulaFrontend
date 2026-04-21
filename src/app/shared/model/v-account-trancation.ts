export interface VAccountTrancation {
    id: number;
    transactionType: number;
    debt: number;
    claim: number;
    balance: number;
    relatingId: number;
    createdAt: Date;
    createdBy: number;
    customerId: number;
    transactionTypeName: string;
    currentAccount: string;
    processAt: Date;
}
