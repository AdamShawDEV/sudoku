import React, { useRef } from "react";
import Portal from "./Portal";
import styles from "./modules/Modal.module.css";
import PropTypes from "prop-types";
import useHandleOutsideClick from "../hooks/useHandleOutsideClick";

function Modal({ children, handleClose }) {
  const modalRef = useRef(null);
  useHandleOutsideClick(modalRef, handleClose);

  React.useEffect(() => {
    const closeOnExcapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnExcapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnExcapeKey);
    };
  });

  const handleClick = (e) => {
    e.stopPropagation();

    handleClose();
  };

  return (
    <Portal wrapperId={"react-portal-modal-container"}>
      <div className={styles.darkBG}>
        <div className={styles.centered}>
          <div className={styles.modal} ref={modalRef}>
            <button onClick={handleClick} className={styles.closeBtn}>
              X
            </button>
            <div className={styles.modalContent}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
};

export default Modal;
