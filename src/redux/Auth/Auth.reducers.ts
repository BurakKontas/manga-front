import { PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./Auth.types";
import { LoginResponse } from "@Services/Auth/AuthService.types";

class AuthReducers {

    private static saveToken(state: IAuthState, action: PayloadAction<LoginResponse>) {
        state.refreshToken = action.payload.refreshToken;
        state.token = action.payload.token;
        state.isLoggedIn = true;
    }

    private static logout(state: IAuthState) {
        state.refreshToken = "";
        state.token = "";
        state.isLoggedIn = false;
    }
    
    static reducers() {
        return {
            saveToken: this.saveToken,
            logout: this.logout,
        }    
    }
}

export default AuthReducers;