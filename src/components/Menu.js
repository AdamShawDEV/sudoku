import styles from "./modules/Menu.module.css";
import { useGameState } from "../hooks/gameState/gameStateContext";
import { startGame, changeStatus } from "../hooks/gameState/actions";
import { createNewGame } from "../gameLogic";
import { DIFFICULTY, GAME_STATUS } from "../CONSTS";
import MenuButton from "./MenuButton";

function Menu() {
  const { dispatch, gameState } = useGameState();

  function handleStartNewGame(e) {
    const difficulty = e.target.id;

    const { gameBoard, completedBoard } = createNewGame(difficulty);

    dispatch(startGame(gameBoard, completedBoard, difficulty));
  }

  function handleContinue() {
    dispatch(changeStatus(GAME_STATUS.PLAYING));
  }

  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.heading}>sudoku</h1>
      {gameState.gameBoard && (
        <MenuButton
          className={styles.menuButton}
          onClick={handleContinue}
          type="hero"
        >
          continue
        </MenuButton>
      )}
      <h3 className={styles.subHeading}>start a new game:</h3>
      <MenuButton
        id={DIFFICULTY.EASY}
        className={styles.menuButton}
        onClick={(e) => handleStartNewGame(e)}
      >
        {" "}
        easy
      </MenuButton>
      <MenuButton
        id={DIFFICULTY.MEDIUM}
        className={styles.menuButton}
        onClick={(e) => handleStartNewGame(e)}
      >
        medium
      </MenuButton>
      <MenuButton
        id={DIFFICULTY.HARD}
        className={styles.menuButton}
        onClick={(e) => handleStartNewGame(e)}
      >
        hard
      </MenuButton>
    </div>
  );
}

export default Menu;
