export interface TokenPermissionModel {
    id: number;
    code: string;
    name: string;
}

export interface TokenRoleModel {
    id: number;
    code: string;
    name: string;
    permissions: TokenPermissionModel[];
}

export interface TokenModel {
    token: string;
    userId: number;
    email: string;
    fullName: string;
    refreshToken?: string;
    expiration?: string;
    roles?: TokenRoleModel[];
}
