import axios, { AxiosInstance } from "axios";
import { CleanResponse, IAPIService, ModelPricingResponse, OCRResponse, TranslateResponse, WriteData, WriteResponse } from "./APIService.types";
import { IAuthService, AuthService } from "../Auth";
import base64ToFile from "../../utils/base64ToFile";

class APIService implements IAPIService {
    private readonly endpoint = 'https://api.mangatranslator.com.tr/main/api/v1/model';
    private readonly instance: AxiosInstance;
    private readonly authService: IAuthService;

    constructor() {
        this.authService = new AuthService();
        const token = localStorage.getItem('token');
        this.instance = axios.create({
            baseURL: this.endpoint,
            headers: {
                "Authorization": `Bearer ${token}`
            },

        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.response.use(
            response => response,
            async error => {
                console.log(error)
                if (error.response && (error.response.status === 608 || error.response.status === 401)) {
                    var isRefreshToken = localStorage.getItem('refreshToken') !== null;
                    if (isRefreshToken && error.config.headers['X-TRY-COUNT'] < 2) {
                        try {
                            const response = await this.authService.refreshToken();
                            error.config.headers['Authorization'] = `Bearer ${response.value.token}`;
                            this.instance.defaults.headers['Authorization'] = `Bearer ${response.value.token}`;
                            this.instance.defaults.headers['X-TRY-COUNT'] = (error.config.headers['X-TRY-COUNT'] || 0) + 1;
                            return this.instance.request(error.config);
                        } catch (refreshError) {
                            console.error('Token yenileme başarısız:', refreshError);
                        }
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
    async ocr(base64: string, predBoxes: number[][]): Promise<Result<OCRResponse>> {
        var file = base64ToFile(base64, 'image.png');
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
    async write(base64: string, data: WriteData[]): Promise<Result<WriteResponse>> {
        var file = base64ToFile(base64, 'image.png');
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