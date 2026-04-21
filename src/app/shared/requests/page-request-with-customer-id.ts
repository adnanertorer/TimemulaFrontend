import { PageRequest } from "./page.request";

export type PageRequestWithCustomerId = {
    customerId: number;
    pageRequest: PageRequest;
}