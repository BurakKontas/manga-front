import * as React from 'react';

export interface DropZoneProps {
    className?: string;
    style?: React.CSSProperties;
    onDrop: (acceptedFiles: File[]) => void;
}

