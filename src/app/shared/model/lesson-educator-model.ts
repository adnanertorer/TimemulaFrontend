import { LessonModel } from "./lesson-model";
import { StaffModel } from "./staff-model";

export interface LessonEducatorModel {
    id: number;
    staffId: number;
    isActive: boolean;
    createdBy?: number;
    createdAt: Date;
    lessonId?: number;
    seansPrice: number;
    lesson?: LessonModel;
    staff?: StaffModel;
}
