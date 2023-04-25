import styles from "./modules/Menu.module.css";
import { useGameState } from "../hooks/gameState/gameStateContext";
import { loadState, changeStatus } from "../hooks/gameState/actions";
import { createNewGame } from "../gameLogic";
import { DIFFICULTY, GAME_STATUS } from "../CONSTS";

function Menu() {
  const { dispatch, gameState } = useGameState();

  function handleStartNewGame(e) {
    const difficulty = e.target.id;

    const { gameBoard, completedBoard } = createNewGame(difficulty);

    dispatch(loadState(gameBoard, completedBoard, difficulty));
  }

  function handleContinue() {
    dispatch(changeStatus(GAME_STATUS.PLAYING));
  }

  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.heading}>sudoku</h1>
      {gameState.gameBoard && (
        <button className={styles.menuButton} onClick={handleContinue}>
          continue
        </button>
      )}
      <span className={styles.subHeading}>start new game:</span>
      <button
        id={DIFFICULTY.EASY}
        className={styles.menuButton}
        onClick={(e) => handleStartNewGame(e)}
      >
        easy
      </button>
      <button
        id={DIFFICULTY.MEDIUM}
        className={styles.menuButton}
        onClick={(e) => handleStartNewGame(e)}
      >
        medium
      </button>
      <button
        id={DIFFICULTY.HARD}
        className={styles.menuButton}
        onClick={(e) => handleStartNewGame(e)}
      >
        hard
      </button>
    </div>
  );
}

export default Menu;
