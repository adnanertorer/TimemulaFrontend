import { DayAndHoursModel } from "./day-and-hours-model";

export interface FilterResponseModel {
    classroomCapacity: number;
    classroomId: number;
    classroomName: string;
    customerCount: number;
    description: string;
    isClosed: boolean;
    lessonCapacity: number;
    lessonFinish: Date;
    lessonStart: Date;
    priority: number;
    lessonName: string;
    reason: string;
    unicKey: string;
    lessonDetailId?: number;
    resultDaysAndHours:DayAndHoursModel[];
    customerId?: number;
    packageId?: number;
    isAvailable: boolean;
}
