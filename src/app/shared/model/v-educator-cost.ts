export interface VEducatorCost {
    id: number;
    educatorId: number;
    name: string;
    surname: string;
    cost: number;
    description: string;
    createdAt: Date;
    createdBy: number;
    changedAt?: Date;
    changedBy?: number;
    packageId: number;
    artPackageName: string;
    lessonId: number;
    lessonName: string;
    startDate: string;
    finishDate: string;
    cashBoxId: number;
    cashBoxName: string;
}