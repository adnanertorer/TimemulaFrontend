export interface ActualCustomerLessonModel {
    id: number;
    customerLessonDetailId?:number;
    customerId: number;
    artPackageId?: number;
    classroomId?: number;
    educatorId?: number;
    startDate: Date;
    finishDate: Date;
    isDone: boolean;
    createdBy: number;
    createdAt: Date;
    unicStrId: string;
    lessonId: number;
    isPayedToEducator?: boolean;
}