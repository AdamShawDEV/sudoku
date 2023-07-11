import "./App.css";
import { useGameState } from "./hooks/gameState/gameStateContext";
import Header from "./components/Header";
import { GAME_STATUS } from "./CONSTS";
import Menu from "./components/Menu";
import PlayField from "./components/PlayField";
import { useEffect } from "react";
import { checkBoard } from "./gameLogic";
import { gameWon } from "./hooks/gameState/actions";
import Themer from "./components/Themer";
import useTheme from "./hooks/theme/useTheme";
import { themeColors } from "./CONSTS";

function App() {
  const { gameState, dispatch } = useGameState();
  const { currentTheme } = useTheme();

  // check for winning state
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
    <Themer variables={themeColors[currentTheme]}>
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
    </Themer>
  );
}

export default App;
