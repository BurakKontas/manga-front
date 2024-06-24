

export type PaymentProviderPropsType = {
    children: React.ReactNode;
}

export interface PaymentProviderValueType {
    getPayment: () => number;
}