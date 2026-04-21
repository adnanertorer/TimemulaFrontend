export interface CustomerInstallmentModel {
    id: number;
    customerId: number;
    totalInstallment: number;
    dayNumber: number;
    interest: number;
    isPackage: boolean;
    serviceId: number;
    amount: number;
    createdAt: Date;
    createdBy: number;
    isManuel?: boolean;
    paymentDate?: Date;
    oldDebt?: number;
}
