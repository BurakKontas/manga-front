export interface IAuthService {
    //commands
    logout():Promise<Result<string>>;
    sendForgotPasswordEmail(email: string):Promise<Result<string>>;
    forgotPassword(changePasswordId: string, newPassword: string):Promise<Result<string>>;

    //queries
    login(email: string, password: string, rememberMe: boolean):Promise<Result<LoginResponse>>;
    register(email: string, firstName: string, lastName: string, password: string):Promise<Result<RegisterResponse>>;
    roleCheck(email: string, role: string):Promise<Result<RoleCheckResponse>>;
    validateToken():Promise<Result<ValidateTokenResponse>>;
    refreshToken():Promise<Result<RefreshTokenResponse>>;
    resendEmailVerification(email: string):Promise<Result<ResendEmailVerificationResponse>>;
    generateGoogleLoginUri():Promise<Result<GenerateGoogleLoginUriResponse>>;
    getAllErrorCodes():Promise<Result<GetAllErrorCodesResponse>>;
    emailVerification(oneTimeCode: string, verificationId: string):Promise<Result<EmailVerificationResponse>>;
    changePassword(email: string, currentPassword:string, newPassword: string):Promise<Result<ChangePasswordResponse>>;
    getUserDetailsFromToken():Promise<Result<GetUserDetailsFromTokenResponse>>;

    //helpers
    getToken(): string;
    setToken(token: string, refreshToken: string, rememberMe: boolean): string;
}

export type LoginResponse = {
    token: string;
    refreshToken: string;
}

export type RegisterResponse = {
    registrationId: string;
}

export type RoleCheckResponse = {
    hasRole: boolean;
}

export type ValidateTokenResponse = {
    isValid: boolean;
}

export type RefreshTokenResponse = {
    token: string;
    refreshToken: string;
}

export type ResendEmailVerificationResponse = {
    registrationId: string;
}

export type GenerateGoogleLoginUriResponse = {
    uri : string;
}

export type GetAllErrorCodesResponse = {
    errorCodes: Map<string, number>;
}

export type ChangePasswordResponse = {
    changed: boolean;
}

export type GetUserDetailsFromTokenResponse = {
    email: string;
    firstName: string;
    lastName: string;
    permissions: string[];
    username: string;
    userId: string;
    lastLogin: Date;
}

export type EmailVerificationResponse = {
    verified: boolean;
}