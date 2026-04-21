export interface LessonModel {
    id: number;
    categoryId: number;
    subCategoryId: number;
    lessonName: string;
    createdBy?: number;
    createdAt: Date;
    lessonPhoto: string;
    category?: any;
    subCategory?: any;
}
