import * as React from 'react';

export interface FormInputProps {
    title: string;
    onChange: (e: HTMLInputElement) => any;
    value: string;
    type?: string;
    disabled?: boolean;
    containerClassName?: string;
    titleClassName?: string;
    inputClassName?: string;
    containerStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    
    children?: React.ReactNode;
}

