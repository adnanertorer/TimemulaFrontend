import { CashboxModel } from "./cashbox-model";
import { SupplierModel } from "./supplier-model";

export interface PaymentModel {
    id: number;
    paymentAmount: number;
    createdAt: Date;
    createdBy: number | null;
    changedAt: Date | null;
    changedBy: number | null;
    cashBoxId: number | null;
    description: string;
    supplierId: number;
    cashBox?: CashboxModel;
    supplier?: SupplierModel;
}