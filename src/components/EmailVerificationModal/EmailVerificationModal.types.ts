import * as React from 'react';

export interface EmailVerificationModalProps {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

