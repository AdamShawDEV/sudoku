import styles from "./modules/GameWonModal.module.css";
import Modal from "./Modal";

function GameWonModal({ handleClose }) {
  return (
    <Modal handleClose={handleClose}>
      <div>you won</div>
    </Modal>
  );
}

export default GameWonModal;
