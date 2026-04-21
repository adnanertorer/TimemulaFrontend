export interface DeptCollectionModel {
    id: number;
   // accountingTransactionId: number;
    collectionAmount: number;
    createdAt: Date;
    createdBy: number;
    changedAt?: Date;
    changedBy?: number;
    cashBoxId?: number;
    description: string;
    customerId: number;
}
