import React from 'react';
import { DropZone } from '@Components/DropZone';

import styles from './Translate.module.scss'
import { ImageWithBBoxes } from '@Components/ImageWithBBoxes';
import { useAPI } from '@Hooks/useAPI';

function Translate() {
  const { clean, modelPricing, ocr, translate, write } = useAPI();
  const [files, setFiles] = React.useState<File[]>([]);
  const [bboxes, setBBoxes] = React.useState<number[][]>([]);
  const [texts, setTexts] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);

  return (
    <div className={styles.container}>
      {files.length === 0 ?
        <DropZone onDrop={setFiles} />
        :
        <div className={styles.content}>
          <div className={styles.image}>
            {files.map((file, index) => (
              <ImageWithBBoxes setBBoxes={setBBoxes} key={index} imageSrc={URL.createObjectURL(file)} bboxes={bboxes} />
            ))}
          </div>
          <div className={styles.controlpanel}>
              <button 
                onClick={async () => {
                  var response = await clean(files[0]);
                  if (response.success) {
                    setBBoxes(response.value.predBoxes);
                  } 
                }}
              >Clean</button>
          </div>
        </div>  
    }
    </div>
  )
}

export default Translate;