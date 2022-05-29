import React from "react";
import Modal from "./Modal";
export default function SucesssModal({
  content,
  show,
  handleModal,
  handleClose,
}) {
  return (
    <Modal
      show={show}
      content={
        <div className="confirm_box sucess">
          <h3> {content}</h3>
          <div className="btn-group center">
            <button
              type="button"
              onClick={() => handleModal()}
              className="btn-primary  btn text-white"
            >
              Continue
            </button>
          </div>
        </div>
      }
    />
  );
}
