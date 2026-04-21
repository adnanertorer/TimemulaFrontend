export interface VCurrentLastBalanceModel {
    id: number;
    debt: number;
    claim: number;
    balance: number;
    customerId: number;
    transactionType: number;
    name: string;
    surname: string;
    transactionTypeName: string;
    createdAt: Date;
    totalInstallmentDebt: number;
}