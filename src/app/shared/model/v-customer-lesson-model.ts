export interface VCustomerLessonModel {
    id: number;
    customerId: number;
    artPackageId: number;
    classroomId: number;
    educatorId: number;
    startDate: Date;
    finishDate: Date;
    isDone: boolean;
    createdBy: number;
    createdAt: Date;
    lessonName: string;
    lessonId: number;
    minCapacity: number;
    maxCapacity: number;
    priority: number;
    artPackageName: string;
    seanceCount: number;
    name: string;
    surname: string;
    classroomName: string;
    quta: number;
    unicStrId: string;
    educatorName: string;
    isPayedToEducator?: boolean;
    isCancel?: boolean;
}
