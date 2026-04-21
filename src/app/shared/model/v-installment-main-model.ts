export interface VInstallmentMainModel {
    id: number;
    customerId: number;
    name: string;
    surname: string;
    paymentAmount: number;
    interestAmount: number;
    mainDept: number;
    withInterestAmount: number;
    totalInstallment: number;
    interestPercent: number;
    dayNumber: number;
    createdBy: number;
    createdAt: Date;
    createdByName: string;
}