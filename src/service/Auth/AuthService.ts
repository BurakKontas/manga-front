import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ChangePasswordResponse, EmailVerificationResponse, GenerateGoogleLoginUriResponse, GetAllErrorCodesResponse, GetUserDetailsFromTokenResponse, IAuthService, LoginResponse, RefreshTokenResponse, RegisterResponse, ResendEmailVerificationResponse, RoleCheckResponse, ValidateTokenResponse } from "./AuthService.types";
import { AppDispatch } from "@Redux/store";
import { useAppSelector } from "@Redux/hooks";
import auth from "@Redux/Auth";

class AuthService implements IAuthService {
    private readonly endpoint = 'https://api.mangatranslator.com.tr/auth/api/v1/auth';
    private readonly instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: this.endpoint
        });

        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return error.response
            }
        );
    }
    
    async login(email: string, password: string): Promise<Result<LoginResponse>> {
        var response = await this.instance.post<Result<LoginResponse>>(endpoints.LOGIN, { email: email, password: password });
        return this.statusCheck(response.data);
    }
    async register(email: string, firstName: string, lastName: string, password: string): Promise<Result<RegisterResponse>> {
        var response = await this.instance.post<Result<RegisterResponse>>(endpoints.REGISTER, { email: email, firstName: firstName, lastName: lastName, password: password });
        return this.statusCheck(response.data);
    }
    async roleCheck(email: string, role: string): Promise<Result<RoleCheckResponse>> {
        var response = await this.instance.post<Result<RoleCheckResponse>>(endpoints.ROLE_CHECK, { email: email, role: role });
        return this.statusCheck(response.data);
    }
    async validateToken(token: string): Promise<Result<ValidateTokenResponse>> {
        var response = await this.instance.post<Result<ValidateTokenResponse>>(endpoints.VALIDATE_TOKEN, { token: token });
        return this.statusCheck(response.data);
    }
    async refreshToken(refreshToken: string): Promise<Result<RefreshTokenResponse>> {
        var response = await this.instance.post<Result<RefreshTokenResponse>>(endpoints.REFRESH_TOKEN, { refreshToken: refreshToken });
        return this.statusCheck(response.data);
    }
    async resendEmailVerification(email: string): Promise<Result<ResendEmailVerificationResponse>> {
        var response = await this.instance.post<Result<ResendEmailVerificationResponse>>(endpoints.RESEND_EMAIL_VERIFICATION, { email: email });
        return this.statusCheck(response.data);
    }
    async generateGoogleLoginUri(): Promise<Result<GenerateGoogleLoginUriResponse>> {
        var response = await this.instance.get<Result<GenerateGoogleLoginUriResponse>>(endpoints.GENERATE_GOOGLE_LOGIN_URI);
        return this.statusCheck(response.data);
    }
    async getAllErrorCodes(): Promise<Result<GetAllErrorCodesResponse>> {
        var response = await this.instance.get<Result<GetAllErrorCodesResponse>>(endpoints.GET_ALL_ERROR_CODES);
        return this.statusCheck(response.data);
    }
    async emailVerification(oneTimeCode: string, registrationId: string): Promise<Result<EmailVerificationResponse>> {
        var response = await this.instance.post<Result<EmailVerificationResponse>>(endpoints.EMAIL_VERIFICATION, { oneTimeCode: oneTimeCode, registrationId: registrationId });
        return this.statusCheck(response.data);
    }
    async changePassword(email: string, currentPassword: string, newPassword: string): Promise<Result<ChangePasswordResponse>> {
        var response = await this.instance.post<Result<ChangePasswordResponse>>(endpoints.CHANGE_PASSWORD, { email: email, currentPassword: currentPassword, newPassword: newPassword });
        return this.statusCheck(response.data);
    }
    async getUserDetailsFromToken(token: string): Promise<Result<GetUserDetailsFromTokenResponse>> {
        var response = await this.instance.post<Result<GetUserDetailsFromTokenResponse>>(endpoints.GET_USER_DETAILS_FROM_TOKEN, { token: token });
        return this.statusCheck(response.data);
    }

    async logout(): Promise<any> {
        var token = useAppSelector(auth.selectors.getRefreshToken);
        var response = await this.instance.post<Result<any>>(endpoints.LOGOUT, { regreshToken: token });
        return this.statusCheck(response.data);
    }
    async sendForgotPasswordEmail(email: string): Promise<any> {
        var response = await this.instance.post<Result<any>>(endpoints.SEND_FORGOT_PASSWORD_EMAIL, { email: email });
        return this.statusCheck(response.data);
    }
    async forgotPassword(changePasswordId: string, newPassword: string): Promise<any> {
        var response = await this.instance.post<Result<any>>(endpoints.FORGOT_PASSWORD, { changePasswordId: changePasswordId, newPassword: newPassword });
        return this.statusCheck(response.data);
    }
    
    private statusCheck(response: Result<any>, onSuccess: Function = () => {}): any {
        if(response.success) {
            onSuccess();
            return response;
        } else {
            return response;
        }
    }

}

export enum endpoints {
    LOGIN = '/login',
    REGISTER = '/register',
    ROLE_CHECK = '/role-check',
    VALIDATE_TOKEN = '/validate-token',
    REFRESH_TOKEN = '/refresh-token',
    RESEND_EMAIL_VERIFICATION = '/resend-email-verification',
    GENERATE_GOOGLE_LOGIN_URI = '/generate-google-login-uri',
    GET_ALL_ERROR_CODES = '/get-all-error-codes',
    EMAIL_VERIFICATION = '/email-verification',
    CHANGE_PASSWORD = '/change-password',
    GET_USER_DETAILS_FROM_TOKEN = '/get_user_details_from_token',
    LOGOUT = '/logout',
    SEND_FORGOT_PASSWORD_EMAIL = '/send-forgot-password-email',
    FORGOT_PASSWORD = '/forgot-password'
}

export default AuthService;