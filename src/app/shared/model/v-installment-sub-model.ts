export interface VInstallmentSubModel {
    id: number;
    installmentMainId: number;
    paymentDate: Date;
    paymentAmount: number;
    isPayment: boolean;
    paymentAt?: Date;
    customerId: number;
    name: string;
    surname: string;
}