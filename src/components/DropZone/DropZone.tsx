import React from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './DropZone.module.scss';
import { DropZoneProps } from './DropZone.types';

const DropZone: React.FC<DropZoneProps> = ({ className = '', style = {}, onDrop }) => {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0]); // Sadece ilk kabul edilen dosyayı işleyelim
      }
    },
    //@ts-ignore
    accept: 'image/*',
    maxFiles: 1
  });

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p className={styles.drophere}>Drop here!</p> :
            <button type="button" style={{width: 130}}>Upload File</button>
        }
      </div>
    </div>
  );
};

export default DropZone;
