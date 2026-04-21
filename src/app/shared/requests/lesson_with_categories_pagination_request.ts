import { PageRequest } from "./page.request";

export type LessonWithCategoriesPaginationRequest = {
  categoryId: number;
  subCategoryId: number;
  pageRequest: PageRequest;
}