export interface TokenModel {
    token: string;
    userId: number;
    email: string;
    fullName: string;
    refreshToken?: string;
    expiration?: string;
}
