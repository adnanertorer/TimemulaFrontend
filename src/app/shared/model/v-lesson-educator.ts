export interface VLessonEducator {
    id: number;
    staffId: number;
    isActive: boolean;
    createdBy: number;
    createdAt: Date;
    lessonId: number;
    seansPrice: number;
    lessonName: string;
    name: string;
    surname: string;
}
