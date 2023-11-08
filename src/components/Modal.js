import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, confirmModal, cancelModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div>{children}</div>
        <div>
          <button className="confirm-button" onClick={confirmModal}>
            Confirm
          </button>
          <button className="cancel-button" onClick={cancelModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
