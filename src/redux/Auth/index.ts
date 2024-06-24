import AuthSlice, { authActions, authSelectors } from "./Auth.slice";

export type { IAuthState } from "./Auth.types";

export default {
    actions: authActions,
    selectors: authSelectors,
    slice: AuthSlice,
}