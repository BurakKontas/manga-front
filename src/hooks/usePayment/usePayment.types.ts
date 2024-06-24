import { CreatePaymentResponse, GetItemsResponse, GetUserCreditResponse, Item, Payment } from "@Services/Payment/PaymentService.types";


export type PaymentProviderPropsType = {
    children: React.ReactNode;
}

export interface PaymentProviderValueType {
    getUserCredit: () => Promise<Result<GetUserCreditResponse>>;
    getItems: () => Promise<Result<GetItemsResponse>>;
    getItem: (itemId: string) => Promise<Result<Item>>;
    createPayment: (itemIds: string[], callbackUri: string, currency: string) => Promise<Result<CreatePaymentResponse>>;
    getPayment: (paymentId: string) => Promise<Result<Payment>>;
}