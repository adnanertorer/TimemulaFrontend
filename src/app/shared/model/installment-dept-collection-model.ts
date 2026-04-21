export interface InstallmentDeptCollectionModel {
    id: number;
    installmentDetailId: number;
    collectionAmount: number;
    createdAt: Date;
    createdBy: number;
    changedAt?: Date;
    changedBy?: number;
    cashBoxId?: number;
    description: string;
    customerId: number;
}
