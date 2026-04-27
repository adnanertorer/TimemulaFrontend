import { TokenRoleModel } from './TokenModel';

export interface ApplicationUser {
    email: string;
    password: string;
    refreshToken: string;
    accessToken: string;
    fullName: string;
    roles?: TokenRoleModel[];
}
