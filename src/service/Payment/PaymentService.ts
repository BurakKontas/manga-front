import axios, { AxiosInstance } from "axios";
import { CreatePaymentResponse, GetItemsResponse, GetUserCreditResponse, IPaymentService, Item, Payment } from "./PaymentService.types";
import { AuthService, IAuthService } from "../Auth";
import { useAppDispatch } from "@Redux/hooks";
import auth from "@Redux/Auth";
class PaymentService implements IPaymentService {
    private readonly endpoint = 'https://api.mangatranslator.com.tr/payment/api/v1';
    private readonly instance: AxiosInstance;
    private readonly authService: IAuthService;

    constructor() {
        this.authService = new AuthService();
        var token = localStorage.getItem('token');
        this.instance = axios.create({
            baseURL: this.endpoint,
            headers: {
                'Content-Type': 'application/json',
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

    async getUserCredit (): Promise<Result<GetUserCreditResponse>> {
        var response = await this.instance.get<Result<GetUserCreditResponse>>(endpoints.GET_USER_CREDIT);
        return this.statusCheck(response.data);
    }
    

    async getItems(): Promise<Result<GetItemsResponse>> {
        var response = await this.instance.get<Result<GetItemsResponse>>(endpoints.GET_ITEMS);
        return this.statusCheck(response.data);
    }

    async getItem(itemId: string): Promise<Result<Item>> {
        var response = await this.instance.get<Result<Item>>(endpoints.GET_ITEM+"?itemId="+itemId);
        return this.statusCheck(response.data);
    }

    async createPayment(itemIds: string[], callbackUri: string, currency: string = "TRY"): Promise<Result<CreatePaymentResponse>> {
        var response = await this.instance.post<Result<CreatePaymentResponse>>(endpoints.CREATE_PAYMENT, { itemIds: itemIds, callbackUrl: callbackUri, currency: currency });
        return this.statusCheck(response.data);
    };

    async getPayment(paymentId: string): Promise<Result<Payment>> {
        var response = await this.instance.get<Result<Payment>>(endpoints.GET_PAYMENT+"?paymentId="+paymentId);
        return this.statusCheck(response.data);
    };

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
    GET_USER_CREDIT = '/users/get',
    GET_ITEMS = '/items/get-all',
    GET_ITEM = '/items/get-item',
    CREATE_PAYMENT = '/payments/create',
    GET_PAYMENT = '/payments/get'
}

export default PaymentService;