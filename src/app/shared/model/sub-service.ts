export interface SubService {
    id: number;
    subServiceName: string;
    createdBy: number;
    serviceId: number;
    price: number;
    isGroup: boolean;
    isAdult: boolean;
    durationMinute?: number;
}
