import React, { createContext, useContext } from "react";
import { AuthProviderPropsType, AuthProviderValueType } from "./useAuth.types";
import { LoginResponse, RegisterResponse, RoleCheckResponse, ValidateTokenResponse, RefreshTokenResponse, ResendEmailVerificationResponse, GenerateGoogleLoginUriResponse, GetAllErrorCodesResponse, EmailVerificationResponse, GetUserDetailsFromTokenResponse, ChangePasswordResponse } from "@/service/Auth/AuthService.types";
import { AuthService } from "../../service/Auth";
import { useAppDispatch } from "@Redux/hooks";

export const AuthContext = createContext<AuthProviderValueType>({
    logout: function (): Promise<Result<string>> {
        throw new Error("Function not implemented.");
    },
    sendForgotPasswordEmail: function (): Promise<Result<string>> {
        throw new Error("Function not implemented.");
    },
    forgotPassword: function (): Promise<Result<string>> {
        throw new Error("Function not implemented.");
    },
    login: function (): Promise<Result<LoginResponse>> {
        throw new Error("Function not implemented.");
    },
    register: function (): Promise<Result<RegisterResponse>> {
        throw new Error("Function not implemented.");
    },
    roleCheck: function (): Promise<Result<RoleCheckResponse>> {
        throw new Error("Function not implemented.");
    },
    validateToken: function (): Promise<Result<ValidateTokenResponse>> {
        throw new Error("Function not implemented.");
    },
    refreshToken: function (): Promise<Result<RefreshTokenResponse>> {
        throw new Error("Function not implemented.");
    },
    resendEmailVerification: function (): Promise<Result<ResendEmailVerificationResponse>> {
        throw new Error("Function not implemented.");
    },
    generateGoogleLoginUri: function (): Promise<Result<GenerateGoogleLoginUriResponse>> {
        throw new Error("Function not implemented.");
    },
    getAllErrorCodes: function (): Promise<Result<GetAllErrorCodesResponse>> {
        throw new Error("Function not implemented.");
    },
    emailVerification: function (): Promise<Result<EmailVerificationResponse>> {
        throw new Error("Function not implemented.");
    },
    changePassword: function (): Promise<Result<ChangePasswordResponse>> {
        throw new Error("Function not implemented.");
    },
    getUserDetailsFromToken: function (): Promise<Result<GetUserDetailsFromTokenResponse>> {
        throw new Error("Function not implemented.");
    }
});

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return authContext;
};


const AuthProvider: React.FC<AuthProviderPropsType> = (props) => {

    var authService = new AuthService();
    const logout = () => authService.logout();
    const sendForgotPasswordEmail = (email: string)  => authService.sendForgotPasswordEmail(email);
    const forgotPassword = (changePasswordId: string, newPassword: string) => authService.forgotPassword(changePasswordId, newPassword);
    const login = (email: string, password: string) => authService.login(email, password);
    const register = (email:string, firstName: string, lastName: string, password: string) => authService.register(email, firstName, lastName, password);
    const roleCheck = (email: string, role: string) => authService.roleCheck(email, role);
    const validateToken = () => authService.validateToken();
    const refreshToken = () => authService.refreshToken();
    const resendEmailVerification = (email: string) => authService.resendEmailVerification(email);
    const generateGoogleLoginUri = () => authService.generateGoogleLoginUri();
    const getAllErrorCodes = () => authService.getAllErrorCodes();
    const emailVerification = (oneTimeCode: string, verificationId: string) => authService.emailVerification(oneTimeCode, verificationId);
    const changePassword = (email: string, currentPassword: string, newPassword: string) => authService.changePassword(email, currentPassword, newPassword);
    const getUserDetailsFromToken = authService.getUserDetailsFromToken;

    return (
        <AuthContext.Provider value={{
            logout,
            sendForgotPasswordEmail,
            forgotPassword,
            login,
            register,
            roleCheck,
            validateToken,
            refreshToken,
            resendEmailVerification,
            generateGoogleLoginUri,
            getAllErrorCodes,
            emailVerification,
            changePassword,
            getUserDetailsFromToken
        } as AuthProviderValueType}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
