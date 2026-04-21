import { CashboxModel } from "./cashbox-model";
import { InstallmentDeptCollectionModel } from "./installment-dept-collection-model";

export interface InstallmentDeptCollectionDialodData {
    deptCollection: InstallmentDeptCollectionModel;
    strDept: number;
    currentAccount: string;
    cashBoxList: CashboxModel[];
}
