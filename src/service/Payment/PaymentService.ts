import axios, { AxiosInstance } from "axios";
import { IPaymentService } from "./PaymentService.types";

class PaymentService implements IPaymentService {
    private readonly endpoint = 'http://localhost:3001';
    private readonly instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: this.endpoint
        });
    }

    async getExample(): Promise<any> {
        let response = await this.instance.get(endpoints.TEST_ENDPOINT);
        return response.data;
    }

    async postExample(data: any): Promise<any> {
        let response = await this.instance.post(endpoints.TEST_ENDPOINT, data);
        return response.data;
    }

}

export enum endpoints {
    TEST_ENDPOINT = '/test_endpoint'
}

export default PaymentService;