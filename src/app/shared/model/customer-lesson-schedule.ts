export interface CustomerLessonSchedule {
    id: number;
    customer_lesson_id: number;
    participation_status_id?: number;
    educator_id?: number;
    educator_notes?: string;
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    IsAllDay: boolean;
    StartTimezone?:string;
    EndTimezone?: string;
    RecurrenceRule: string; //"FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=1;UNTIL=20191130T130000Z;"
    Location: string;
    Description: string;
}
