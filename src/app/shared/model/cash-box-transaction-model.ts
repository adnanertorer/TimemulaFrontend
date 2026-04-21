export interface CashBoxTransactionModel {
    id: number;
    cashBoxId: number;
    transactionTypeId?: number;
    cost: number;
    createdAt: Date;
    createdBy: number;
}

