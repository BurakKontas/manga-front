import axios, { AxiosInstance } from "axios";
import { CleanResponse, IAPIService, ModelPricingResponse, OCRResponse, TranslateResponse, WriteData, WriteResponse } from "./APIService.types";
import { IAuthService, AuthService } from "../Auth";

class APIService implements IAPIService {
    private readonly endpoint = 'https://api.mangatranslator.com.tr/main/api/v1/model';
    private readonly instance: AxiosInstance;
    private readonly refreshToken: string;
    private readonly authService: IAuthService;

    constructor(token: string, refreshToken: string) {
        this.authService = new AuthService();
        this.instance = axios.create({
            baseURL: this.endpoint,
            headers: {
                "Authorization": `Bearer ${token}`
            },

        });

        this.refreshToken = refreshToken;
        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response && error.response.status === 608 || error.response.status === 401) {
                    if(this.refreshToken != null) {
                        await this.authService.refreshToken(this.refreshToken);
                        return this.instance.request(error.config);
                    }
                }
                return error.response;
            }
        );
    }
    async modelPricing(): Promise<Result<ModelPricingResponse>> {
        throw new Error("Method not implemented.");
    }
    async clean(file: File): Promise<Result<CleanResponse>> {
        var formData = new FormData();
        formData.append('file', file);
        var response = await this.instance.post<Result<CleanResponse>>(endpoints.CLEAN, formData);
        return this.statusCheck(response.data);
    }
    async ocr(file: File, predBoxes: number[][]): Promise<Result<OCRResponse>> {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('predBoxes', JSON.stringify(predBoxes));
        var response = await this.instance.post<Result<OCRResponse>>(endpoints.OCR, formData);
        return this.statusCheck(response.data);
    }
    async translate(text: string, target: string, source: string): Promise<Result<TranslateResponse>> {
        var response = await this.instance.post<Result<TranslateResponse>>(endpoints.TRANSLATE, { text: text, target: target, source: source });
        return this.statusCheck(response.data);
    }
    async write(file: File, data: WriteData[]): Promise<Result<WriteResponse>> {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify(data));
        var response = await this.instance.post<Result<WriteResponse>>(endpoints.WRITE, formData);
        return this.statusCheck(response.data);
    }

    private statusCheck(response: Result<any>, onSuccess: Function = () => { }): any {
        if (response.success) {
            onSuccess();
            return response;
        } else {
            return response;
        }
    }
}

export enum endpoints {
    CLEAN = '/clean',
    OCR = '/ocr',
    TRANSLATE = '/translate',
    WRITE = '/write',
    MODEL_PRICING = '/model-pricing'
}

export default APIService;