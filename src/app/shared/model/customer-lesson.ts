export interface CustomerLesson {
    id: number;
    customerId: number;
    artPackageId: number;
    classroomId: number;
    educatorId?: number;
    startDate: Date;
    finishDate: Date;
    isDone: boolean;
    createdBy: number;
    createdAt: Date;
    categoryId: number;
    subCategoryId: number;
    lessonId: number;
    unicStrId: string;
    isPayedToEducator?: boolean;
    artPackage?: any;
    customer?: any;
    staff?: any;
}
