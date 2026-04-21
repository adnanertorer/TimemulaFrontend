export interface VCashboxTransactionModel {
    id: number;
    cashBoxId: number;
    cashBoxName: string;
    transactionTypeId: number;
    transactionType: string;
    cost: number;
    createdAt: Date;
    createdBy: number;
    createdByName: string;
}
