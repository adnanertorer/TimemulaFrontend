import { CashboxModel } from "./cashbox-model";
import { PaymentModel } from "./payment-model";

export interface PaymentDialogData {
    paymentModel: PaymentModel;
    strDept: number;
    currentAccount: string;
    cashBoxList: CashboxModel[];
}
