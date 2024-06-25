export interface ImageWithBBoxesProps {
    imageSrc: string;
    bboxes: number[][];
    setBBoxes: (bboxes: number[][]) => void;
    selectedBBox: number | null;
    setSelectedBBox: (index: number) => void;
}

