import { PageRequest } from "./page.request";

export type SubCategoryWithCategoryIdPaginationRequest = {
    pageRequest: PageRequest;
    categoryId: number;
}