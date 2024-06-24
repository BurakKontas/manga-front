import { IAuthState } from "./Auth.types";

class AuthSelectors {

    private static isLoggedIn(state: IAuthState) {
        return state.isLoggedIn;
    }

    private static getRefreshToken(state: IAuthState) {
        return state.refreshToken;
    }

    private static getToken(state: IAuthState) {
        return state.token;
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