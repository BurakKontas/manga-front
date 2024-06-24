export interface IAPIService {
    clean(file: File): Promise<Result<CleanResponse>>;
    ocr(file: File, predBoxes: number[][]): Promise<Result<OCRResponse>>
    translate(text: string, target: string, source: string): Promise<Result<TranslateResponse>>;
    write(file: File, data: WriteData[]): Promise<Result<WriteResponse>>;
    modelPricing(): Promise<Result<ModelPricingResponse>>;
}

export type CleanResponse = {
    predBoxes: number[][];
    gt: string;
    mask: string;
    output: string;
    outputComp: string;
    outputImage: string;
}

export type OCRResponse = {
    ocrData: OCRQueryData[][][];
}

export type TranslateResponse = {
    target: string;
    source: string;
    text: string;
    result: string;
}

export type WriteData = {
    bbox: number[];
    text: string;
    color?: string;
}

export type OCRQueryData = {
    text: string;
    image: string;
    confidence?: number;
}

export type WriteResponse = {
    debug: boolean;
    lastImage: string;
    results: WriteResult[];
}

export type WriteResult = {
    color: string;
    fontSize: number;
    text: string;
}

export type ModelPricingResponse = {
    prices: Map<String, number>;
}