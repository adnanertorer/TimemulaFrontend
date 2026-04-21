export interface EducatorDaysHoursModel {
    id: number;
    educatorId: number;
    day: number;
    startTime: string;
    finishTime: string;
    createdBy: number;
    createdAt: Date;
    changedBy?: number;
    changedAt?: string;
    educatorName?: string;
    dayName?: string;
}

