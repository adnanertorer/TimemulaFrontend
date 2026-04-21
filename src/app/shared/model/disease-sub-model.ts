export interface DiseaseSubModel {
    id: number;
    diaseMainId: number;
    diaseName: string;
    createdBy?: number;
    createdAt: Date;
    isActive: boolean;
    description?: string;
    isRequiredDescription: boolean;
}