import React, { createContext, useContext } from "react";
import { APIProviderPropsType, APIProviderValueType } from "./useAPI.types";
import { CleanResponse, OCRResponse, TranslateResponse, WriteData, WriteResponse, ModelPricingResponse } from "@Services/API/APIService.types";
import { useAppSelector } from "@Redux/hooks";
import auth from "@Redux/Auth";
import { APIService } from "../../service/API";

export const APIContext = createContext<APIProviderValueType>({
    clean: function (): Promise<Result<CleanResponse>> {
        throw new Error("Function not implemented.");
    },
    ocr: function (): Promise<Result<OCRResponse>> {
        throw new Error("Function not implemented.");
    },
    translate: function (): Promise<Result<TranslateResponse>> {
        throw new Error("Function not implemented.");
    },
    write: function (): Promise<Result<WriteResponse>> {
        throw new Error("Function not implemented.");
    },
    modelPricing: function (): Promise<Result<ModelPricingResponse>> {
        throw new Error("Function not implemented.");
    }
})

export const useAPI = () => {
    const apiContext = useContext(APIContext);

    if (!apiContext) {
        throw new Error('useAPI must be used within a APIProvider');
    }

    return apiContext;
};


const APIProvider: React.FC<APIProviderPropsType> = (props) => {
    var apiService = new APIService();

    const clean = (file: File) => apiService.clean(file);
    const ocr = (file: string, predBoxes: number[][]) => apiService.ocr(file, predBoxes);
    const translate = (text: string, target: string, source: string) => apiService.translate(text, target, source);
    const write = (file: string, data: WriteData[]) => apiService.write(file, data);
    const modelPricing = () => apiService.modelPricing();

    return (
        <APIContext.Provider value={{ clean, modelPricing, ocr, translate, write }}>
            {props.children}
        </APIContext.Provider>
    )
}

export default APIProvider;
