import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import NumPad from "./components/NumPad";
import { addNumber } from "./hooks/gameState/actions";
import { useGameState } from "./hooks/gameState/gameStateContext";

const emptySelection = { rowIdx: null, rowIdx: null };

function App() {
  const [selectedCell, setSelectedCell] = useState(emptySelection);
  const { dispatch } = useGameState();

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
      <header className="App-header">Sudoku</header>
      <main>
        <GameBoard setSelectedCell={selectCell} selectedCell={selectedCell} />
        <NumPad handleNumKeyPress={handleNumKeyPress} />
      </main>
    </div>
  );
}

export default App;
