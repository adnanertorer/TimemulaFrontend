export interface WarehouseModel {
    id: number;
    productId: number;
    prType: number;
    amount: number;
    cost: number;
    createdAt: Date;
    createdBy: number;
    changedAt?: Date;
    changedBy?: number;
    currentAccount: number;
    discount?: number;
    unitPrice: number;
}
