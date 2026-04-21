import { PageRequest } from "./page.request";

export type EductorLessonFilter = {
    educatorId: number;
    lessonId: number;
    cashBoxId: number;
    startDate: Date;
    endDate: Date;
    categoryId: number;
    subCategoryId: number;
    packageId: number;
}

export type PageRequestWithEducatorLessonFilter = {
    pageRequest: PageRequest;
    filter: EductorLessonFilter;
}