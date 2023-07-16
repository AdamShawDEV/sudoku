import "./App.css";
import { useGameState } from "./hooks/gameState/gameStateContext";
import Header from "./components/Header";
import { GAME_STATUS } from "./CONSTS";
import Menu from "./components/Menu";
import PlayField from "./components/PlayField";
import Themer from "./components/Themer";
import useTheme from "./hooks/theme/useTheme";
import { themeColors } from "./CONSTS";

function App() {
  const { gameStatus } = useGameState();
  const { currentTheme } = useTheme();

  return (
    <Themer variables={themeColors[currentTheme]}>
      {gameStatus === GAME_STATUS.INITIAL ? (
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
