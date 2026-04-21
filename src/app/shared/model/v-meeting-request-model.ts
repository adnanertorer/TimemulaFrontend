export interface VMeetingRequestModel {
    id: number;
    requestByName: string;
    meetingDate: Date;
    title: string;
    requestDescription: string;
    createdAt: Date;
    createdBy: number;
    isDone: boolean;
    relationStaff: number;
    name: string;
    surname: string;
    createdByName: string;
    createdBySurname: string;
}
