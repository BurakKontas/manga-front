import React from 'react';
import { DropZone } from '@Components/DropZone';
import styles from './Translate.module.scss';
import { ImageWithBBoxes } from '@Components/ImageWithBBoxes';
import { useAPI } from '@Hooks/useAPI';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import credit from '@Redux/Credit';
import { useToast } from '@Hooks/useToast';
import base64ToFile from '@Utils/base64ToFile';
import fileToBase64 from '@Utils/fileToBase64';
import { WriteData } from '@Services/API/APIService.types';
import { useNavigate } from 'react-router-dom';
import auth from '@Redux/Auth';

function Translate() {
  const navigate = useNavigate();
  const { success, error, info, warning } = useToast();
  var token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token === null) {
      warning("Sign In", "You need to sign in to access this page.")
      navigate("/signin");
    }
  }, [])

  if(token === null) return null;

  const { clean, modelPricing, ocr, write } = useAPI();
  const [selectedBBox, setSelectedBBox] = React.useState<number>(0);
  const [file, setFile] = React.useState<File | null>(null);
  const [cleanFile, setCleanFile] = React.useState<File | null>(null);
  const [outputFile, setOutputFile] = React.useState<File | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number>(0);
  const [bboxes, setBBoxes] = React.useState<number[][]>([]);
  const [texts, setTexts] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [wrote, setWrote] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const afterModel = () => {
    dispatch(credit.async_thunks.fetchCredit());
  }

  const modelPipe = async (func: Function) => {
    setLoading(true);
    try {
      await func();
      success("Model", "Process completed successfully.")
    } catch (err) {
      console.error("Error in model pipe:", err);
      error("Model", "An error occurred. Please try again later.")
    } finally {
      setLoading(false);
      afterModel();
      info("Model", "Credit has been updated.")
    }
  }

  const handleClean = async () => {
    if(!file) {
      error("Clean", "Please upload an image to clean.")
      return;
    }
    const response = await clean(file);
    if (response.success) {
      setTexts(new Array(response.value.predBoxes.length).fill(""));
      setBBoxes(response.value.predBoxes);
      setCleanFile(base64ToFile(response.value.output, "cleaned.png"));
      setColors(new Array(response.value.predBoxes.length).fill("#000000"));
    }
  };

  // Button Handlers
  const handleOCR = async () => {
    if (!file) {
      error("Clean", "Please upload an image to clean.")
      return;
    }
    const response = await ocr(await fileToBase64(file), bboxes);
    if (response.success) {
      var data = response.value.ocrData;
      var newTexts = new Array(data.length).fill("");
      data.forEach((ocrData, index) => {
        var text = ocrData.map(d => d[0].text);
        newTexts[index] = text.join(" ");
      })
      setTexts(newTexts);
    }

  };
  const handleWrite = async () => {
    if(!cleanFile) {
      error("Write", "Please clean the image before writing.")
      return;
    }
    var writeData: WriteData[] = [];
    const file = await fileToBase64(cleanFile);

    texts.forEach((text, index) => {
      writeData.push({
        text: text,
        bbox: bboxes[index],
        color: colors[index]
      })
    })

    const response = await write(file, writeData);
    if (response.success) {
      setOutputFile(base64ToFile(response.value.lastImage, "output.png"));
      setWrote(true);
    }
  };
  const handleShowCleanedImage = () => {
    if (cleanFile) {
      setSelectedImageIndex(1);
    }
  };
  const handleShowOriginalImage = () => {
    setSelectedImageIndex(0);
  }
  const handleDownloadFinishedImage = () => {
    if (wrote || outputFile) {
      const url = URL.createObjectURL(outputFile!);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.png";
      a.click();
    } else {
      error("Download", "Please write the text before downloading.")
    }
  }

  return (
    <div className={styles.container}>
      {file === null ?
        <DropZone onDrop={setFile} />
        :
        <div className={styles.content}>
          <div className={styles.image}>
            {(file) && <ImageWithBBoxes selectedBBox={selectedBBox} setSelectedBBox={setSelectedBBox} setBBoxes={setBBoxes} key={"image"} imageSrc={URL.createObjectURL(selectedImageIndex === 0 ? file : cleanFile!)} bboxes={bboxes} />}
          </div>
          <div className={styles.controlpanel}>
            {bboxes.length > 0 ? (
              bboxes.map((_, index) => (
                <BBoxTextInput key={index} index={index} texts={texts} setTexts={setTexts} color={colors[index]} setColor={(newColor: string) => {
                  const newColors = [...colors];
                  newColors[index] = newColor;
                  setColors(newColors);
                }}
                modelPipe={modelPipe}
                 />
              ))
            ) : (
              <div className={styles.placeholder}>
                No bounding boxes found. Please clean the image to generate bounding boxes.
              </div>
            )}
            <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={() => modelPipe(handleClean)} disabled={loading}>Clean</button>
              <button className={styles.button} onClick={() => modelPipe(handleOCR)} disabled={loading || cleanFile === null}>OCR</button>
              <button className={styles.button} onClick={() => modelPipe(handleWrite)} disabled={loading || cleanFile === null}>Write</button>
              <button className={styles.button} onClick={handleShowCleanedImage} disabled={loading || cleanFile === null}>Show Cleaned Image</button>
              <button className={styles.button} onClick={handleShowOriginalImage} disabled={loading}>Show Original Image</button>
              <button className={styles.button} onClick={handleDownloadFinishedImage} disabled={loading || !wrote}>Download Finished Image</button>
            </div>
          </div>
        </div>
      }
      {loading && <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <div className={styles.loadingText}>This process may take approximately 3 minutes.<br></br>Please do not refresh or close the page. <br></br>This may cause you to lose your credits.</div>
      </div>}
    </div>
  )
}

export default Translate;

const BBoxTextInput = ({ index, texts, setTexts, color, setColor, modelPipe }: { index: number, texts: string[], setTexts: Function, color: string, setColor: Function, modelPipe: Function }) => {
  const { translate } = useAPI();
  const { error, success } = useToast();

  const handleTranslate = async () => {
    if(texts[index] === "") {
      error("Translate", "Please enter a text to translate.")
      return;
    }
    modelPipe(async () => {
      var response = await translate(texts[index], "turkish", "english");
      if (response.success) {
        const newTexts = [...texts];
        newTexts[index] = response.value.result;
        setTexts(newTexts);
      }
    })
  }

  return (
    <div className={styles.bboxtextinput}>
      <input
        key={index}
        type="text"
        className={styles.textBox}
        value={texts[index] || ""}
        onChange={(e) => {
          const newTexts = [...texts];
          newTexts[index] = e.target.value;
          setTexts(newTexts);
        }}
        placeholder={`Text for bbox ${index + 1}`}
      />
      <button onClick={handleTranslate}>Translate</button>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
    </div>
  )
}
