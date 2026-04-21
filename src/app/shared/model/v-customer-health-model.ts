export interface VCustomerHealthModel {
    id: number;
    customerId: number;
    mainDiseaseId: number;
    subDiseaseId: number;
    description: string;
    createdAt: Date;
    createdBy: number;
    diseaseCategoryName: string;
    diaseName: string;
    isRequiredDescription: boolean;
}