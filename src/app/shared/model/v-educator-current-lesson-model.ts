import { Customer } from "./customer";
import { VCustomerLessonModel } from "./v-customer-lesson-model";
import { VCustomerPackageBasicInfoModel } from "./v-customer-package-basic-info-model";

export interface VEducatorCurrentLessonModel {
    id: number;
    isActive: boolean;
    name: string;
    surname: string;
    isTeacher: boolean;
    lessonId: number;
    lessonName: string;
    artPackageId: number;
    artPackageName: string;
    classroomId: number;
    classromName: string;
    firstLessonDate: Date;
    lastLessonDate: Date;
    totalCustomer: number;
    vCustomerLessons: VCustomerLessonModel[];
    customers: Customer[];
    vCustomerPackageBasicInfos: VCustomerPackageBasicInfoModel[];
}
