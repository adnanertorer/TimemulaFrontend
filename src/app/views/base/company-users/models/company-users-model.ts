import { Roles } from "../../roles/shared/roles.model";

export type CompanyUsersModel = {
    id: number;
    email: string;
    name: string;
    surname: string;
    isActive: boolean;
    phoneNumber: string;
    password: string;
    passwordAgain?: string;
    roleId?: number;
    role?: any;
}