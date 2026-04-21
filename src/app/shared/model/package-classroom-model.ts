export interface PackageClassroomModel {
    id: number;
    classroomId: number;
    lessonId: number;
    minCapacity: number;
    maxCapacity: number;
    priority: number;
    createdBy: number;
    createdAt: Date;
    categoryId: number;
    subCategoryId: number;
    lesson?: any;
    classroom?: any;
}
