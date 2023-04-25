import styles from "./modules/Header.module.css";
import { useGameState } from "../hooks/gameState/gameStateContext";
import { loadState } from "../hooks/gameState/actions";
import { createNewGame } from "../gameLogic";

function Header() {
  const { dispatch } = useGameState();

  function handleNewGameButtonClick() {
    const gameBoard = createNewGame();
    dispatch(loadState(gameBoard));
  }

  return (
    <header className={styles.header}>
      <span>sudocu</span>
      <button onClick={handleNewGameButtonClick}>new game</button>
    </header>
  );
}

export default Header;
