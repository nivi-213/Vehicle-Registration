import React from "react";
import "./Spinner.css";

const ModalSpinner = () => {
  return (
    <div className="modal-spinner-overlay">
      <div className="modal-spinner">
        <div className="bubble-circle-spinner">
          <div className="bubble bubble1"></div>
          <div className="bubble bubble2"></div>
          <div className="bubble bubble3"></div>
          <div className="bubble bubble4"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalSpinner;
