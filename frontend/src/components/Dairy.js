import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import "./Diary.css";

const Diary = () => {
  const canvasRef = useRef();
  const [showCanvas, setShowCanvas] = useState(true);

  const handleToggleCanvas = () => {
    if (!showCanvas) {
      setShowCanvas(true);
    }
  };

  const handleToggleText = () => {
    if (showCanvas) {
      setShowCanvas(false);
    }
  };

  const handleExportImage = () => {
    if (canvasRef.current) {
      canvasRef.current
        .exportImage("png")
        .then((data) => {
          console.log(data); // Base64 data URL of the exported image
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  const handleResetCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.resetCanvas();
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const handleEraseMode = () => {
    if (canvasRef.current) {
      canvasRef.current.eraseMode(true);
    }
  };

  return (
    <div className="diary-container">
      <h1 className="diary-heading">My Diary</h1>
      <div className="toggle-container">
        <button
          className={`toggle-button ${showCanvas ? "active" : ""}`}
          onClick={handleToggleCanvas}
        >
          Canvas
        </button>
        <button
          className={`toggle-button ${!showCanvas ? "active" : ""}`}
          onClick={handleToggleText}
        >
          Text
        </button>
      </div>
      {showCanvas ? (
        <div className="canvas-section">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={3}
            strokeColor="gray"
            width="100%"
            height="40rem"
            canvasColor="#E1F0DA"
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <div className="button-container">
            <button className="diary-button" onClick={handleClearCanvas}>
              Clear Canvas
            </button>
            <button className="diary-button" onClick={handleResetCanvas}>
              Reset Canvas
            </button>
            <button className="diary-button" onClick={handleUndo}>
              Undo
            </button>
            <button className="diary-button" onClick={handleRedo}>
              Redo
            </button>
            <button className="diary-button" onClick={handleEraseMode}>
              Erase Mode
            </button>
            <button className="diary-button" onClick={handleExportImage}>
              Export as Image
            </button>
          </div>
        </div>
      ) : (
        <div className="text-section">
          <textarea
            className="text-area"
            placeholder="Write your thoughts here..."
          ></textarea>
          <button className="diary-button">Save</button>
        </div>
      )}
    </div>
  );
};

export default Diary;

