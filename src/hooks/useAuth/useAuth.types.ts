import { LoginResponse, RegisterResponse, RoleCheckResponse, ValidateTokenResponse, RefreshTokenResponse, ResendEmailVerificationResponse, GenerateGoogleLoginUriResponse, GetAllErrorCodesResponse, EmailVerificationResponse, ChangePasswordResponse, GetUserDetailsFromTokenResponse } from "@/service/Auth/AuthService.types";


export type AuthProviderPropsType = {
    children: React.ReactNode;
}

export interface AuthProviderValueType {
    //commands
    logout(): Promise<Result<string>>;
    sendForgotPasswordEmail(email: string): Promise<Result<string>>;
    forgotPassword(changePasswordId: string, newPassword: string): Promise<Result<string>>;

    //queries
    login(email: string, password: string, rememberMe: boolean): Promise<Result<LoginResponse>>;
    register(email: string, firstName: string, lastName: string, password: string): Promise<Result<RegisterResponse>>;
    roleCheck(email: string, role: string): Promise<Result<RoleCheckResponse>>;
    validateToken(): Promise<Result<ValidateTokenResponse>>;
    refreshToken(): Promise<Result<RefreshTokenResponse>>;
    resendEmailVerification(email: string): Promise<Result<ResendEmailVerificationResponse>>;
    generateGoogleLoginUri(): Promise<Result<GenerateGoogleLoginUriResponse>>;
    getAllErrorCodes(): Promise<Result<GetAllErrorCodesResponse>>;
    emailVerification(oneTimeCode: string, verificationId: string): Promise<Result<EmailVerificationResponse>>;
    changePassword(email: string, currentPassword: string, newPassword: string): Promise<Result<ChangePasswordResponse>>;
}