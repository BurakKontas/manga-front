

export type ToastProviderPropsType = {
    children: React.ReactNode;
}

export interface ToastProviderValueType {
    success: (title: string, message: string) => void;
    error: (title: string, message: string) => void;
    warning: (title: string, message: string) => void;
    info: (title: string, message: string) => void;
}