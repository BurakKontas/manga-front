import React, { createContext, useContext } from "react";
import { PaymentProviderPropsType, PaymentProviderValueType } from "./usePayment.types";
import { GetUserCreditResponse, GetItemsResponse, Item, CreatePaymentResponse, Payment } from "@Services/Payment/PaymentService.types";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import auth from "@Redux/Auth";
import PaymentService from "../../service/Payment/PaymentService";

export const PaymentContext = createContext<PaymentProviderValueType>({
    getUserCredit: function (): Promise<Result<GetUserCreditResponse>> {
        throw new Error("Function not implemented.");
    },
    getItems: function (): Promise<Result<GetItemsResponse>> {
        throw new Error("Function not implemented.");
    },
    getItem: function (): Promise<Result<Item>> {
        throw new Error("Function not implemented.");
    },
    createPayment: function (): Promise<Result<CreatePaymentResponse>> {
        throw new Error("Function not implemented.");
    },
    getPayment: function (): Promise<Result<Payment>> {
        throw new Error("Function not implemented.");
    }
})

export const usePayment = () => {
    const paymentContext = useContext(PaymentContext);

    if (!paymentContext) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }

    return paymentContext;
};


const PaymentProvider: React.FC<PaymentProviderPropsType> = (props) => {
    const token = useAppSelector(auth.selectors.getToken)
    const refreshToken = useAppSelector(auth.selectors.getRefreshToken)

    var paymentService = new PaymentService(token, refreshToken!);

    const getUserCredit = () => paymentService.getUserCredit();
    const getItems = () => paymentService.getItems();
    const getItem = (itemId: string) => paymentService.getItem(itemId);
    const createPayment = (itemIds: string[], callbackUri: string, currency: string) => paymentService.createPayment(itemIds, callbackUri, currency);
    const getPayment = (paymentId: string) => paymentService.getPayment(paymentId); 

    return (
        <PaymentContext.Provider value={{ createPayment, getItem, getItems, getPayment, getUserCredit }}>
            {props.children}
        </PaymentContext.Provider>
    )
}

export default PaymentProvider;
