import { IAuthState } from "./Auth.types";

class AuthSelectors {

    private static isLoggedIn(state: IAuthState) {
        return state.isLoggedIn;
    }

    private static getRefreshToken() {
        var refreshToken = localStorage.getItem('refreshToken');
        return refreshToken;
    }

    private static getToken() {
        var token = localStorage.getItem('token');
        return token;
    }

    public static selectors() {
        return {
            isLoggedIn: this.isLoggedIn,
            getRefreshToken: this.getRefreshToken,
            getToken: this.getToken,
        };
    }
}

export default AuthSelectors;