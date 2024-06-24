import React, { createContext, useContext } from "react";
import { PaymentProviderPropsType, PaymentProviderValueType } from "./usePayment.types";

export const PaymentContext = createContext<PaymentProviderValueType>({
    getPayment: () => { throw new Error('getPayment is not implemented') },
})

export const usePayment = () => {
    const paymentContext = useContext(PaymentContext);

    if (!paymentContext) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }

    return paymentContext;
};


const PaymentProvider: React.FC<PaymentProviderPropsType> = (props) => {
    const [payment, setPayment] = React.useState(0);

    const getPayment = () => payment;

    return (
        <PaymentContext.Provider value={{ getPayment }}>
            {props.children}
        </PaymentContext.Provider>
    )
}

export default PaymentProvider;
