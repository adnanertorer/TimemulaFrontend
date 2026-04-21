export interface EducatorCostFilterModel {
    educatorId: number;
    cashBoxId: number;
    lessonId: number;
    startDate?: Date;
    endDate?: Date;
    categoryId: number;
    subCategoryId: number;
    packageId: number;
}
