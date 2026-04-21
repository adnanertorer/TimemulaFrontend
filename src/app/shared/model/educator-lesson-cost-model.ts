export interface EducatorLessonCostModel {
    id: number;
    staffId: number;
    actualCustomerLessonId?: number;
    cost: number;
    description: string;
    createdAt: Date;
    createdBy?: number;
    changedAt?: Date;
    changedBy?: number;
    staffName?: string;
    lessonName?: string;
    classroomName?: string;
    lessonId?: number;
    cashBoxId?: number;
}
