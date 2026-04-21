import { Customer } from "./customer";
import { CustomerLesson } from "./customer-lesson";

export interface EducatorLessonCurrentModel{
    id: number;
    isActive: boolean;
    name: string;
    surname: string;
    isTeacher: boolean;
    lessonId?: number;
    lessonName?: string;
    artPackageId?: number;
    classroomName?: string;
    classroomId?: number;
    firstLessonDate: Date;
    lastLessonDate: Date;
    totalCustomer: number;
    customerLesson: CustomerLesson[];
    customer: Customer[];
    customerPackageBasicInfos: any[];
}