export interface IAuthState {
    isLoggedIn: boolean;
    token: string;
    refreshToken?: string;
}