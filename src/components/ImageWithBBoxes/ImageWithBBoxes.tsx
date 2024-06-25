import React, { useEffect, useState, useRef } from 'react';
import { ImageWithBBoxesProps } from './ImageWithBBoxes.types';
import styles from './ImageWithBBoxes.module.scss';

const ImageWithBBoxes: React.FC<ImageWithBBoxesProps> = ({ imageSrc, bboxes, setBBoxes, selectedBBox, setSelectedBBox }) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const [normalizedBBoxes, setNormalizedBBoxes] = useState<number[][]>([]);
  const resizingRef = useRef<{ index: number; dir: string; startX: number; startY: number; startBBox: number[]; } | null>(null);
  const draggingRef = useRef<{ index: number; startX: number; startY: number; startBBox: number[]; } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    const normalize = () => {
      const { width, height } = dimensions;
      const normalized = bboxes.map(([x1, y1, x2, y2]) => [
        (x1 / width) * 100,
        (y1 / height) * 100,
        ((x2 - x1) / width) * 100,
        ((y2 - y1) / height) * 100,
      ]);
      setNormalizedBBoxes(normalized);
    };
    normalize();
  }, [bboxes, dimensions]);

  const handleMouseDown = (index: number, dir: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const bbox = normalizedBBoxes[index];
    resizingRef.current = {
      index,
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startBBox: [...bbox]
    };
  };

  const handleDragStart = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const bbox = normalizedBBoxes[index];
    draggingRef.current = {
      index,
      startX: e.clientX,
      startY: e.clientY,
      startBBox: [...bbox]
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizingRef.current) {
      const { index, dir, startX, startY, startBBox } = resizingRef.current;
      const deltaX = ((e.clientX - startX) / dimensions.width) * 100;
      const deltaY = ((e.clientY - startY) / dimensions.height) * 100;

      const newBBoxes = [...normalizedBBoxes];
      let newBBox = [...startBBox];

      // Update width/height and/or position based on the resizer direction
      if (dir.includes('right')) newBBox[2] = startBBox[2] + deltaX;
      if (dir.includes('bottom')) newBBox[3] = startBBox[3] + deltaY;
      if (dir.includes('left')) {
        newBBox[0] = startBBox[0] + deltaX;
        newBBox[2] = startBBox[2] - deltaX;
      }
      if (dir.includes('top')) {
        newBBox[1] = startBBox[1] + deltaY;
        newBBox[3] = startBBox[3] - deltaY;
      }

      newBBoxes[index] = newBBox;
      setNormalizedBBoxes(newBBoxes);
    } else if (draggingRef.current) {
      const { index, startX, startY, startBBox } = draggingRef.current;
      const deltaX = ((e.clientX - startX) / dimensions.width) * 100;
      const deltaY = ((e.clientY - startY) / dimensions.height) * 100;

      const newBBoxes = [...normalizedBBoxes];
      let newBBox = [...startBBox];
      newBBox[0] = startBBox[0] + deltaX;
      newBBox[1] = startBBox[1] + deltaY;

      newBBoxes[index] = newBBox;
      setNormalizedBBoxes(newBBoxes);
    }
  };

  const handleMouseUp = () => {
    if (resizingRef.current) {
      const { index } = resizingRef.current;
      const bbox = normalizedBBoxes[index];
      const { width, height } = dimensions;
      const absoluteBBox = [
        (bbox[0] / 100) * width,
        (bbox[1] / 100) * height,
        ((bbox[0] + bbox[2]) / 100) * width,
        ((bbox[1] + bbox[3]) / 100) * height,
      ];
      const newBBoxes = [...bboxes];
      newBBoxes[index] = absoluteBBox;
      setBBoxes(newBBoxes);
    } else if (draggingRef.current) {
      const { index } = draggingRef.current;
      const bbox = normalizedBBoxes[index];
      const { width, height } = dimensions;
      const absoluteBBox = [
        (bbox[0] / 100) * width,
        (bbox[1] / 100) * height,
        ((bbox[0] + bbox[2]) / 100) * width,
        ((bbox[1] + bbox[3]) / 100) * height,
      ];
      const newBBoxes = [...bboxes];
      newBBoxes[index] = absoluteBBox;
      setBBoxes(newBBoxes);
    }
    resizingRef.current = null;
    draggingRef.current = null;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className={styles.image_container}>
      <img src={imageSrc} alt="annotated" className={styles.image} />
      {normalizedBBoxes.map((bbox, index) => (
        <div
          key={index}
          className={`${styles.bbox} ${selectedBBox === index ? styles.selected : ''}`}
          style={{
            left: `${bbox[0]}%`,
            top: `${bbox[1]}%`,
            width: `${bbox[2]}%`,
            height: `${bbox[3]}%`,
          }}
          onClick={() => setSelectedBBox(index)}
          onMouseDown={handleDragStart(index)}
        >
          <div className={`${styles.resizer} ${styles['top-left']}`} onMouseDown={handleMouseDown(index, 'top-left')} >
            <span className={styles.index}>{index + 1}</span>
          </div>
          <div className={`${styles.resizer} ${styles['top-right']}`} onMouseDown={handleMouseDown(index, 'top-right')} />
          <div className={`${styles.resizer} ${styles['bottom-left']}`} onMouseDown={handleMouseDown(index, 'bottom-left')} />
          <div className={`${styles.resizer} ${styles['bottom-right']}`} onMouseDown={handleMouseDown(index, 'bottom-right')} />
          <div className={`${styles.resizer} ${styles.top}`} onMouseDown={handleMouseDown(index, 'top')} />
          <div className={`${styles.resizer} ${styles.bottom}`} onMouseDown={handleMouseDown(index, 'bottom')} />
          <div className={`${styles.resizer} ${styles.left}`} onMouseDown={handleMouseDown(index, 'left')} />
          <div className={`${styles.resizer} ${styles.right}`} onMouseDown={handleMouseDown(index, 'right')} />
        </div>
      ))}
    </div>
  );
};

export default ImageWithBBoxes;
