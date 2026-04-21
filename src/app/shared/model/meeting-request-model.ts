import { StaffModel } from "./staff-model";

export interface MeetingRequestModel {
    id: number;
    requestByName: string;
    meetingDate: Date;
    title: string;
    requestDescription: string;
    createdAt: Date;
    createdBy: number;
    isDone: boolean;
    categoryColor?: string;
    meetingFinishDate?: Date;
    relationStaff: number;
    staff?: StaffModel;
}