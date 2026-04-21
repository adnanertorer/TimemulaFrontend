import { LessonEducatorModel } from "./lesson-educator-model";

export interface StaffModel {
    id: number;
    createdBy: number;
    name: string;
    surname:string;
    identityNumber: string;
    gsm: string;
    address: string;
    staffTypeId: number;
    salaryTypeId: number;
    callenderOrder: number;
    email: string;
    workStarDateTime: Date;
    workFinishDateTime?: Date;
    birthDate?: Date;
    branchId?: number;
    isTeacher?: boolean;
    salaryAmount?: number;
    salaryType?: any;
    staffType?: any;
    lessonEducators?: LessonEducatorModel[];
}
