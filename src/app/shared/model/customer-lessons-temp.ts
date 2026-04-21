export interface CustomerLessonsTemp {
    id: number;
    artPackageId?: number;
    classroomId?: number;
    educatorId?: number;
    startDate: Date;
    finishDate: Date;
    isDone: boolean;
    createdBy?: number;
    createdAt: Date;
    unicStrId: string;
    lessonId?: number;
    isPayedToEducator?: boolean;
    unicKey: string;
    categoryId: number;
    subCategoryId: number;
}