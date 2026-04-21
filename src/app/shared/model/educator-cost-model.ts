import { ArtPackageModel } from "./art-package-model";
import { CashboxModel } from "./cashbox-model";
import { LessonModel } from "./lesson-model";
import { StaffModel } from "./staff-model";

export interface EducatorCostModel {
    id: number;
    educatorId: number;
    packageId: number;
    lessonId: number;
    currentDate: any;
    cost: number;
    description: string;
    createdAt: Date;
    createdBy: number;
    transactionType: number;
    changedAt?: Date;
    changedBy?: number;
    cashBoxId?: number;
    staffName: string;
    classroomName: string;
    lessonName: string;
    staff?: StaffModel;
    artPackage?: ArtPackageModel;
    lesson?: LessonModel;
    cashBox?: CashboxModel;
    approveType: number;
}