export interface VEducatorCostProgram {
    artPackageId: number;
    classroomId: number;
    educatorId: number;
    startDate: Date;
    finishDate: Date;
    name: string;
    surname: string;
    classromName: string;
    lessonId: number;
    lessonName: string;
    artPackageName: string;
    totalCustomer: number;
    classroomQuta: number;
    minCapacity: number;
    maxCapacity: number;
}