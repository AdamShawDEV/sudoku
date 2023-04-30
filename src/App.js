import "./App.css";
import { useGameState } from "./hooks/gameState/gameStateContext";
import Header from "./components/Header";
import { GAME_STATUS } from "./CONSTS";
import Menu from "./components/Menu";
import PlayField from "./components/PlayField";
import { useEffect } from "react";
import { checkBoard } from "./gameLogic";
import { gameWon } from "./hooks/gameState/actions";

function App() {
  const { gameState, dispatch } = useGameState();

  // check for winnind state
  useEffect(() => {
    if (
      gameState.gameBoard !== null &&
      gameState.gameStatus === GAME_STATUS.PLAYING &&
      checkBoard(gameState.gameBoard, gameState.completedBoard)
    ) {
      dispatch(gameWon());
    }

    // eslint-disable-next-line
  }, [gameState.gameBoard]);

  return (
    <>
      {gameState.gameStatus === GAME_STATUS.INITIAL ? (
        <Menu />
      ) : (
        <>
          <Header />
          <main>
            <PlayField />
          </main>
        </>
      )}
    </>
  );
}

export default App;
