import React, { createContext, useContext, useRef } from "react";
import { ToastProviderPropsType, ToastProviderValueType } from "./useToast.types";
import { Toast } from 'primereact/toast';

export const ToastContext = createContext<ToastProviderValueType>({
    success: function (): void {
        throw new Error("Function not implemented.");
    },
    error: function (): void {
        throw new Error("Function not implemented.");
    },
    warning: function (): void {
        throw new Error("Function not implemented.");
    },
    info: function (): void {
        throw new Error("Function not implemented.");
    }
})

export const useToast = () => {
    const toastContext = useContext(ToastContext);

    if (!toastContext) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return toastContext;
};


const ToastProvider: React.FC<ToastProviderPropsType> = (props) => {
    const toast = useRef<Toast>(null);

    const showToast = (severity: "success" | "info" | "warn" | "error", title: string, message: string) => {
        toast.current?.show({ severity: severity, summary: title, detail: message, closable: true, sticky: false});
    }

    const success = (title: string, message: string) => showToast("success", title, message);
    const error = (title: string, message: string) => showToast("error", title, message);
    const warning = (title: string, message: string) => showToast("warn", title, message);
    const info = (title: string, message: string) => showToast("info", title, message);

    return (
        <ToastContext.Provider value={{ success, error, warning, info }}>
            <Toast ref={toast} />
            {props.children}
        </ToastContext.Provider>
    )
}

export default ToastProvider;
