import { PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./Auth.types";
import { LoginResponse } from "@Services/Auth/AuthService.types";

class AuthReducers {

    private static saveToken(state: IAuthState, action: PayloadAction<LoginResponse>) {
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
        if(action.payload.refreshToken) localStorage.setItem('refreshToken', action.payload.refreshToken);
    }

    private static login(state: IAuthState) {
        if(localStorage.getItem('token'))
            state.isLoggedIn = true;
    }

    private static logout(state: IAuthState) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        state.isLoggedIn = false;
    }
    
    static reducers() {
        return {
            saveToken: this.saveToken,
            logout: this.logout,
            login: this.login,
        }    
    }
}

export default AuthReducers;