import { PageRequest } from "./page.request";

export type PageRequestWithCustomerIdAndUniqueKey = {
    customerId: number;
    uniqueKey: string;
    pageRequest: PageRequest;
}