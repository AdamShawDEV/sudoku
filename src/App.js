import "./App.css";
import { useGameState } from "./hooks/gameState/gameStateContext";
import Header from "./components/Header";
import { GAME_STATUS } from "./CONSTS";
import Menu from "./components/Menu";
import PlayField from "./components/PlayField";

function App() {
  const { gameState } = useGameState();

  return (
    <>
      {gameState.gameStatus === GAME_STATUS.PLAYING ? (
        <>
          <Header />
          <main>
            <PlayField />
          </main>
        </>
      ) : (
        <Menu />
      )}
    </>
  );
}

export default App;
