import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserMultiFormatReader } from "@zxing/library";
import Webcam from "react-webcam";

function App() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const onUpdate = (err: any, res?: any) => {
    if (res) setResult(res.text);
    else setResult("no data")
    if (err) setError(JSON.stringify(err));
  };
  const webcamRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const capture = useCallback(() => {
    let _a;
    const imageSrc =
      (_a =
        webcamRef === null || webcamRef === void 0
          ? void 0
          : webcamRef.current) === null || _a === void 0
        ? void 0
        // @ts-ignore
        : _a.getScreenshot();
    if (imageSrc) {
      codeReader
        .decodeFromImage(undefined, imageSrc)
        .then((result) => {
          onUpdate(null, result);
        })
        .catch((err) => {
          onUpdate(err);
        });
    }
  }, [codeReader, onUpdate]);

  useEffect(() => {
    setInterval(capture, 500);
  }, []);

  return (
    <>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment",
        }}
      />
      <p>Result: {result}</p>
      <p>Error: {error}</p>
    </>
  );
}

export default App;
