export interface ImageWithBBoxesProps {
    imageSrc: string;
    bboxes: number[][];
    setBBoxes: (bboxes: number[][]) => void;
}

