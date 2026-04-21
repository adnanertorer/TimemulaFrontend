import { DayAndHoursModel } from "./day-and-hours-model";

export interface ChangePackageResourceModel {
    currentLessonId: number;
    dayAndHourList: DayAndHoursModel[];
    customerId: number;
    unicKey: string;
}