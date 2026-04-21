import { dayOf } from "src/app/views/base/customer-package/customer-package.component";

export interface CriteriaFilterModel {
  days: dayOf[];
  packetHour: string;
  startDate?: any;
  finishDate?: any;
  lessonId: number;
  packageId: number;
  unicKey?: string;
  customerId?: number;
  educatorId?: number;
}
