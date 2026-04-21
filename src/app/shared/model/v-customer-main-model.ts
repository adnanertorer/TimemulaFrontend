export interface VCustomerMainModel {
    customerId: number;
    artPackageId: number;
    lessonName: string;
    lessonId: number;
    artPackageName: string;
    classroomName: string;
    classroomId: number;
    minStartDate: Date;
    maxFinishDate: Date;
    unicStrId: string;
    endLesson?: boolean;
}
