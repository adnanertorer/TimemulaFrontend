import { AccountingTransactionModel } from "./accounting-transaction-model";

export interface InstallmentResultModel {
    paymentDates: Date[];
    paymentAmount: number;
    interestAmount: number;
    mainDept: number;
    withInterestAmount: number;
    totalInstallment: number;
    customerId: number
    createdAt: Date;
    createdBy: number;
    mainId: number;
    relatingId?: string;
    transactionId?: number;
    oldDebt?: number;
    transactions: AccountingTransactionModel[];
}
