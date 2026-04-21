import { PageRequest } from "./page.request";

export type TempToActualRequest = {
    customerId: number;
    uniqueKey: string;
    pageRequest: PageRequest;
}