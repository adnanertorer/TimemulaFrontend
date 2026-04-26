export type CompanyUsersModel = {
    id: number;
    email: string;
    name: string;
    surname: string;
    isActive: boolean;
    phoneNumber: string;
    password: string;
    passwordAgain?: string;
}