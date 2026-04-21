export interface ArtPackageModel {
    id: number;
    categoryId: number;
    subCategoryId?: number;
    participantTypeId?: number;
    lessonId?: number;
    createdBy: number;
    createdAt: Date;
    artPackageName: string;
    seanceCount: number;
    unitPrice: number;
    seancePrice: number;
    discount?: number;
    description: string;
    isActive: boolean;
    participantId?: number;
    maxCapacity?: number;
    duration?: number;
    participant?: any;
}
