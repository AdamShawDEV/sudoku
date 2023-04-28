import styles from "./modules/GameWonModal.module.css";
import Modal from "./Modal";
import { useGameState } from "../hooks/gameState/gameStateContext";
import MenuButton from "./MenuButton";

function GameWonModal({ handleClose }) {
  const { gameState } = useGameState();
  const { gamesWon, gamesPlayed, perfectGames, currentStreak, longestStreak } =
    gameState.stats;

  return (
    <Modal handleClose={handleClose}>
      <h1>{gameState.perfectGame ? "Perfect game!" : "You Won!"}</h1>
      <h2>Stats:</h2>
      <div className={styles.row}>
        <div>
          <span>games played:</span>
          <div className={styles.stat}>{gamesPlayed}</div>
        </div>
        <div>
          <span>games won:</span>
          <div className={styles.stat}>{gamesWon}</div>
        </div>
      </div>
      <div className={styles.row}>
        <div>
          <span>perfect games:</span>
          <div className={styles.stat}>{perfectGames}</div>
        </div>
      </div>
      <div className={styles.row}>
        <div>
          <span>current streak:</span>
          <div className={styles.stat}>{currentStreak}</div>
        </div>
        <div>
          <span>longest streak:</span>
          <div className={styles.stat}>{longestStreak}</div>
        </div>
      </div>
      <MenuButton type="hero" onClick={handleClose}>
        close
      </MenuButton>
    </Modal>
  );
}

export default GameWonModal;
