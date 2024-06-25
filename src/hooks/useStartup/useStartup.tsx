import React, { createContext, useContext } from "react";
import { StartupProviderPropsType, StartupProviderValueType } from "./useStartup.types";
import { AuthService } from "../../service/Auth";
import { useAppDispatch } from "@Redux/hooks";
import auth from "@Redux/Auth";
import credit from "@Redux/Credit";
import { useAuth } from "@Hooks/useAuth";

export const StartupContext = createContext<StartupProviderValueType>({
})

const StartupProvider: React.FC<StartupProviderPropsType> = (props) => {
    var dispatch = useAppDispatch();
    async function startup() {
        var authService = new AuthService();
        var isValid = await authService.validateToken();
        if (isValid.value.isValid) {
            dispatch(auth.actions.login());
            dispatch(credit.async_thunks.fetchCredit())
        }
        else {
            var refreshToken = localStorage.getItem('refreshToken');
            if(refreshToken !== null) {
                await authService.refreshToken();
                dispatch(auth.actions.login());
            } else {
                dispatch(auth.actions.logout());
            }
        }
    }
    
    React.useEffect(() => {
        startup();
    }, []);

    return (
        <StartupContext.Provider value={{ }}>
            {props.children}
        </StartupContext.Provider>
    )
}

export default StartupProvider;
