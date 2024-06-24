import { createAppSlice } from "../hooks";
import { IAuthState } from "./Auth.types";

import AuthReducers from "./Auth.reducers";
import AuthSelectors from "./Auth.selectors";

const initialState: IAuthState = {
    isLoggedIn: false,
    token: "",
    refreshToken: "",
};

export const AuthSlice = createAppSlice({
    name: "auth",
    initialState,
    selectors: AuthSelectors.selectors(),
    reducers: AuthReducers.reducers(),
});

// Action creators are generated for each case reducer function
export const authActions = AuthSlice.actions;
export const authSelectors = AuthSlice.selectors;

export default AuthSlice.reducer;