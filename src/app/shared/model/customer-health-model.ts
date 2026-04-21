import { DiseaseMainModel } from "./disease-main-model";
import { DiseaseSubModel } from "./disease-sub-model";

export interface CustomerHealthModel {
    id: number;
    customerId: number;
    mainDiseaseId?: number;
    subDiseaseId?: number;
    description: string;
    createdAt: Date;
    createdBy?: number;
    diseaseMain?: DiseaseMainModel;
    diseaseSub?: DiseaseSubModel;
}
