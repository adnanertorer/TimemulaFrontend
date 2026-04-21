export interface VActualCustomerLessonModel {
    id: number;
    customerId: number;
    artPackageId: number;
    classroomId: number;
    educatorId?: number;
    startDate: string;
    finishDate: string;
    isDone: boolean;
    createdBy: number;
    createdAt: string;
    lessonName: string;
    lessonId: number;
    artPackageName: string;
    seanceCount: number;
    name: string;
    surname: string;
    classromName: string;
    quta: number;
    unicStrId: string;
    educatorName: string;
    isMoved?: boolean;
    categoryColor?: string;
    isPayedToEducator?: boolean;
    lessonPhoto: string;
    categoryName?: string;
    subCategoryName?: string;
}