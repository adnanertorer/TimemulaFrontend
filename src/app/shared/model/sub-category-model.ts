export interface SubCategoryModel {
    id: number;
    categoryId: number;
    name: string;
    createdBy?: number;
    createdAt?: Date;
    category?: any;
}
