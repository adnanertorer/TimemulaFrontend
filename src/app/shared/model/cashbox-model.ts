export interface CashboxModel {
    id: number;
    cashBoxName: string;
    cashBoxType: number;
    iban: string;
    bankAccountNumber: string;
    createdBy: number;
    createdAt: Date;
    changedBy?: number;
    changedAt?: Date;
}
