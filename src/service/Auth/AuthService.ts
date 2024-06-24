import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ChangePasswordResponse, EmailVerificationResponse, GenerateGoogleLoginUriResponse, GetAllErrorCodesResponse, GetUserDetailsFromTokenResponse, IAuthService, LoginResponse, RefreshTokenResponse, RegisterResponse, ResendEmailVerificationResponse, RoleCheckResponse, ValidateTokenResponse } from "./AuthService.types";

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
    async login(email: string, password: string, rememberMe: boolean): Promise<Result<LoginResponse>> {
        var response = await this.instance.post<Result<LoginResponse>>(endpoints.LOGIN, { email: email, password: password });
        return this.statusCheck(response.data, () => {
            this.setToken(response.data.value.token, response.data.value.refreshToken, rememberMe);
        });
    }
    async register(email: string, firstName: string, lastName: string, password: string): Promise<Result<RegisterResponse>> {
        var response = await this.instance.post<Result<RegisterResponse>>(endpoints.REGISTER, { email: email, firstName: firstName, lastName: lastName, password: password });
        return this.statusCheck(response.data);
    }
    async roleCheck(email: string, role: string): Promise<Result<RoleCheckResponse>> {
        var response = await this.instance.post<Result<RoleCheckResponse>>(endpoints.ROLE_CHECK, { email: email, role: role });
        return this.statusCheck(response.data);
    }
    async validateToken(): Promise<Result<ValidateTokenResponse>> {
        var response = await this.instance.post<Result<ValidateTokenResponse>>(endpoints.VALIDATE_TOKEN, { token: this.getToken() });
        return this.statusCheck(response.data);
    }
    async refreshToken(): Promise<Result<RefreshTokenResponse>> {
        var response = await this.instance.post<Result<RefreshTokenResponse>>(endpoints.REFRESH_TOKEN, { token: this.getToken() });
        return this.statusCheck(response.data, () => {
            this.setToken(response.data.value.token, response.data.value.refreshToken, true);
        });
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
    async emailVerification(oneTimeCode: string, verificationId: string): Promise<Result<EmailVerificationResponse>> {
        var response = await this.instance.post<Result<EmailVerificationResponse>>(endpoints.EMAIL_VERIFICATION, { oneTimeCode: oneTimeCode, verificationId: verificationId });
        return this.statusCheck(response.data);
    }
    async changePassword(email: string, currentPassword: string, newPassword: string): Promise<Result<ChangePasswordResponse>> {
        var response = await this.instance.post<Result<ChangePasswordResponse>>(endpoints.CHANGE_PASSWORD, { email: email, currentPassword: currentPassword, newPassword: newPassword });
        return this.statusCheck(response.data);
    }
    async getUserDetailsFromToken(): Promise<Result<GetUserDetailsFromTokenResponse>> {
        var response = await this.instance.post<Result<GetUserDetailsFromTokenResponse>>(endpoints.GET_USER_DETAILS_FROM_TOKEN, { token: this.getToken() });
        return this.statusCheck(response.data);
    }

    async logout(): Promise<any> {
        var token = this.getToken();
        var response = await this.instance.post<Result<any>>(endpoints.LOGOUT, { regreshToken: token });
        return this.statusCheck(response.data, () => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('refreshToken');
        });
    }
    async sendForgotPasswordEmail(email: string): Promise<any> {
        var response = await this.instance.post<Result<any>>(endpoints.SEND_FORGOT_PASSWORD_EMAIL, { email: email });
        return this.statusCheck(response.data);
    }
    async forgotPassword(changePasswordId: string, newPassword: string): Promise<any> {
        var response = await this.instance.post<Result<any>>(endpoints.FORGOT_PASSWORD, { changePasswordId: changePasswordId, newPassword: newPassword });
        return this.statusCheck(response.data);
    }

    getToken(): string {
        let token = sessionStorage.getItem('refreshToken');

        if (token) {
            return token;
        } else {
            token = localStorage.getItem('refreshToken');

            if (token) {
                return token;
            } else {
                throw new Error('No token found');
            }
        }
    }
    setToken(token: string, refreshToken: string, rememberMe: boolean): string {
        //TODO: add these to redux if not remember me do not add refreshtoken
        if(rememberMe) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
        } else {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('refreshToken', refreshToken);
        }

        return token;
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