import styles from "./modules/PlayField.module.css";
import { useState } from "react";
import GameBoard from "./GameBoard";
import NumPad from "./NumPad";
import { addNumber } from "../hooks/gameState/actions";
import { useGameState } from "../hooks/gameState/gameStateContext";

const emptySelection = { rowIdx: null, colIdx: null };

function PlayField({ selectCell }) {
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
    <div className={styles.playField}>
      <GameBoard setSelectedCell={selectCell} selectedCell={selectedCell} />
      <NumPad handleNumKeyPress={handleNumKeyPress} />
    </div>
  );
}

export default PlayField;
