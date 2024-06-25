import { CleanResponse, OCRResponse, TranslateResponse, WriteData, WriteResponse, ModelPricingResponse } from "@Services/API/APIService.types";


export type APIProviderPropsType = {
    children: React.ReactNode;
}

export interface APIProviderValueType {
    clean(file: File): Promise<Result<CleanResponse>>;
    ocr(file: string, predBoxes: number[][]): Promise<Result<OCRResponse>>
    translate(text: string, target: string, source: string): Promise<Result<TranslateResponse>>;
    write(file: string, data: WriteData[]): Promise<Result<WriteResponse>>;
    modelPricing(): Promise<Result<ModelPricingResponse>>;
}