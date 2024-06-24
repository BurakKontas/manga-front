import React, { createContext, useContext } from "react";
import { CDNProviderPropsType, CDNProviderValueType } from "./useCDN.types";

export const CDNContext = createContext<CDNProviderValueType>({
    getCDN: () => { throw new Error('getCDN is not implemented') },
})

export const useCDN = () => {
    const cdnContext = useContext(CDNContext);

    if (!cdnContext) {
        throw new Error('useCDN must be used within a CDNProvider');
    }

    return cdnContext;
};


const CDNProvider: React.FC<CDNProviderPropsType> = (props) => {
    const [cdn, setCDN] = React.useState(0);

    const getCDN = () => cdn;

    return (
        <CDNContext.Provider value={{ getCDN }}>
            {props.children}
        </CDNContext.Provider>
    )
}

export default CDNProvider;
