import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import NumPad from "./components/NumPad";
import { addNumber } from "./hooks/gameState/actions";
import { useGameState } from "./hooks/gameState/gameStateContext";
import Header from "./components/Header";
import { GAME_STATUS } from "./CONSTS";

const emptySelection = { rowIdx: null, colIdx: null };

function App() {
  const [selectedCell, setSelectedCell] = useState(emptySelection);
  const { dispatch, gameState } = useGameState();

  function handleNumKeyPress(value) {
    if (selectedCell.rowIdx != null && selectedCell.colIdx != null) {
      dispatch(addNumber(value, selectedCell.rowIdx, selectedCell.colIdx));
    }
  }

  function selectCell(cell) {
    setSelectedCell((curr) => {
      if (curr.rowIdx === cell.rowIdx && curr.colIdx === cell.colIdx)
        return emptySelection;

      return cell;
    });
  }

  return (
    <div className="App">
      <Header />
      <main>
        {gameState.gameStatus === GAME_STATUS.PLAYING ? (
          <>
            <GameBoard
              setSelectedCell={selectCell}
              selectedCell={selectedCell}
            />
            <NumPad handleNumKeyPress={handleNumKeyPress} />
          </>
        ) : (
          <div>hiya</div>
        )}
      </main>
    </div>
  );
}

export default App;
