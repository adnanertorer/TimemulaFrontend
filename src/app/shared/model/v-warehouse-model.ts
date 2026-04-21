export interface VWarehouseModel {
    id: number;
    productId: number;
    name: string;
    prType: number;
    amount: number;
    cost: number;
    createdAt: Date;
    createdBy: number;
    createdByName: string;
    changedAt?: Date;
    changedBy?: number;
    changedByName: string;
    transactionType: string;
    unitPrice: number;
    discount: number;
    supplierId: number;
    companyName: string;
}