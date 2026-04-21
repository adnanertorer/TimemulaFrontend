import { DayAndHoursModel } from "./day-and-hours-model";

export interface SellPackageCriteriaModel {
    dayAndHourList: DayAndHoursModel[];
    lessonId: number;
    packageId: number;
    startTime: Date;
    customerId?: number;
    educatorId: number;
}
