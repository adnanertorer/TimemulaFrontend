export interface VStaffsModel {
    id: number;
    isActive: boolean;
    createdBy: number;
    createdAt: Date;
    identityNumber: string;
    name: string;
    surname: string;
    gsm: string;
    address: string;
    staffTypeId: number;
    staffTypeName: string;
    salaryTypeId: number;
    salaryTypeName: string;
    email: string;
    workStarDateTime?: Date;
    workFinishDateTime?: Date;
    birthDate?: Date;
    branchId: number;
    branchName: string;
    salaryAmount?: number;
}

