import { CashboxModel } from "./cashbox-model";
import { DeptCollectionModel } from "./dept-collection-model";

export interface DeptCollectionDialogData {
  deptCollection: DeptCollectionModel;
  strDept: number;
  currentAccount: string;
  cashBoxList: CashboxModel[];
}
