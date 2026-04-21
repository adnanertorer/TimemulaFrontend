import { PageRequest } from "./page.request";

export type GetListByPackageRequest = {
    customerId: number;
    unicStr: string;
    pageRequest: PageRequest;
}