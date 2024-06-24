import React, { createContext, useContext } from "react";
import { APIProviderPropsType, APIProviderValueType } from "./useAPI.types";

export const APIContext = createContext<APIProviderValueType>({
    getAPI: () => { throw new Error('getAPI is not implemented') },
})

export const useAPI = () => {
    const apiContext = useContext(APIContext);

    if (!apiContext) {
        throw new Error('useAPI must be used within a APIProvider');
    }

    return apiContext;
};


const APIProvider: React.FC<APIProviderPropsType> = (props) => {
    const [api, setAPI] = React.useState(0);

    const getAPI = () => api;

    return (
        <APIContext.Provider value={{ getAPI }}>
            {props.children}
        </APIContext.Provider>
    )
}

export default APIProvider;
