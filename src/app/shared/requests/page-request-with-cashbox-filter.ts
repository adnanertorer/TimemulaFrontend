import { PageRequest } from './page.request';

export type PageRequestWithCashboxFilter = {
  cashBoxFilter: CashboxFilter;
  pageRequest: PageRequest;
};

export type CashboxFilter = {
  cashBoxId: number;
  transactionTypeId: number;
  startDate: Date;
  finishDate: Date;
};
