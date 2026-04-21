export interface VClassroomPackageModel {
    id: number;
    classroomId: number;
    classroomName: string;
    classroomCapacity: number;
    maxCapacity: number;
    classroomMinCapacity: number;
    classroomMaxCapacity: number;
    priority: number;
    createdById: number;
    createdAt: Date;
    createdByName: string;
    lessonId: number;
    lessonName: string;
}
