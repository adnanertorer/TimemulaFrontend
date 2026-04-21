import { ArtPackageModel } from "./art-package-model";
import { ClassroomModel } from "./classroom-model";
import { LessonModel } from "./lesson-model";
import { StaffModel } from "./staff-model";

export interface CustomerLessonModel {
    id: number;
    created_by: number;
    remaining_price?: number;
    service_id: number;
    customer_id: number;
    sub_service_id: number;
    process_at: Date;
    process_detail: string;
    price: number;
    educator_id: number;
    staff_id: number;
    leading_person_id: number;
    paid?: number;
    payment_type_id?: number;
    remaining_payment_at?: Date;
    branch_id: number;
    classroom_id: number;
    startDate: Date;
    lesson_group_id?: number;
    artPackage?: ArtPackageModel;
    classroom?: ClassroomModel;
    lesson?: LessonModel;
    staff?: StaffModel;
}
