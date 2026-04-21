export interface ProductModel {
    id: number;
    isActive: boolean;
    createdBy: number;
    createdAt: Date;
    name: string;
    price: number;
    description: string;
    productPhoto: string;
}
