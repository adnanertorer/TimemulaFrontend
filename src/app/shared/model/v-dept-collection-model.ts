export interface VDeptCollectionModel {
    id: number;
    collectionAmount: number;
    createdAt: Date;
    createdBy: number;
    changedAt: Date | null;
    changedBy: number | null;
    cashBoxId: number;
    description: string;
    customerId: number;
    name: string;
    surname: string;
    cashBoxName: string;
    createdByName: string;
}
