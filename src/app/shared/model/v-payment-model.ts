export interface VPaymentModel {
    id: number;
    paymentAmount: number;
    createdAt: Date;
    createdBY: number;
    changedAt?: Date
    changedBy?: number;
    cashBoxId: number;
    description: string;
    supplierId: number;
    companyName: string;
    createdByName: string;
    cashBoxName: string;
}
