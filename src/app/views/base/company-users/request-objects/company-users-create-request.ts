export interface CompanyUsersCreateRequest {
    email: string;
    password?: string;
    passwordAgain?: string;
    name: string;
    surname: string;
    isActive: boolean;
    phoneNumber: string;
    id?: number;
}