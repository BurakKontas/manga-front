import React, { createContext, useContext } from "react";
import { StartupProviderPropsType, StartupProviderValueType } from "./useStartup.types";
import { AuthService } from "../../service/Auth";
import { useAppDispatch } from "@Redux/hooks";
import auth from "@Redux/Auth";
import credit from "@Redux/Credit";

export const StartupContext = createContext<StartupProviderValueType>({
})

const StartupProvider: React.FC<StartupProviderPropsType> = (props) => {
    var dispatch = useAppDispatch();
    async function startup() {
        var authService = new AuthService();
        var isValid = await authService.validateToken();
        if (isValid.success) {
            dispatch(auth.actions.login());
            dispatch(credit.async_thunks.fetchCredit())
        }
        else dispatch(auth.actions.logout());
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
