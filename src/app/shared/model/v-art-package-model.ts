export interface VArtPackageModel {
    id: number;
    categoryId: number;
    categoryName: string;
    subCategoryId: number;
    subCategoryName: string;
    participantTypeId: number;
    participantTypeName: string;
    createdAt: Date;
    createdById: number;
    createdByName: string;
    artPackageName: string;
    seanceCount: number;
    unitPrice: number;
    seancePrice: number;
    discount: number;
    description: string;
    isActive: boolean;
    participantId: number;
    participantName: string;
    maxCapacity?: number;
    duration?: number;
}
