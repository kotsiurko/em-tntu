import React from "react";
const Modal = ({ children, show, hideModal, title }) => (
  <div
    className={`modal ${show ? " modal-show" : ""}`}
    tabIndex="-1"
    role="dialog"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={hideModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={hideModal}
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  </div>
);
export default Modal;
