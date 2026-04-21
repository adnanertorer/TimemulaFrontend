export interface SupplierModel {
    id: number;
    companyName: string;
    authorized: string;
    phone: string;
    address: string;
    isActive: boolean;
    createdBy: number;
    createdAt: Date;
    changedBy?: number;
    changedAt?: Date;
}
