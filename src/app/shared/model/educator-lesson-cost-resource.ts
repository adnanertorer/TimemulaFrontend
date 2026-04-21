export interface EducatorLessonCostResource {
    id: number;
    staffId: number;
    actualCustomerLessonId?: number;
    cost: number;
    description: string;
    createdAt: string;
    createdBy?: number;
    changedAt?: string;
    changedBy?: number;
    cashBoxId?: number;
}