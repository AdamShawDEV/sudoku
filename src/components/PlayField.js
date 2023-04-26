import styles from "./modules/PlayField.module.css";
import { useState } from "react";
import GameBoard from "./GameBoard";
import NumPad from "./NumPad";
import { addDraft, addNumber } from "../hooks/gameState/actions";
import { useGameState } from "../hooks/gameState/gameStateContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
  BASE_GAME_BOARD_DIAMETER,
  BASE_PLAY_FIELD_HEIGHT,
  HEADER_HEIGHT,
} from "../CONSTS";

const emptySelection = { rowIdx: null, colIdx: null };

function PlayField() {
  const [selectedCell, setSelectedCell] = useState(emptySelection);
  const [isDraft, setIsDraft] = useState(false);
  const { windowDimentions } = useWindowDimensions();
  const { dispatch } = useGameState();

  const scaleFactor = Math.min(
    (windowDimentions.height - HEADER_HEIGHT) / BASE_PLAY_FIELD_HEIGHT,
    windowDimentions.width / BASE_GAME_BOARD_DIAMETER,
    1
  );

  function handleNumKeyPress(value) {
    if (selectedCell.rowIdx != null && selectedCell.colIdx != null) {
      isDraft
        ? dispatch(addDraft(value, selectedCell.rowIdx, selectedCell.colIdx))
        : dispatch(addNumber(value, selectedCell.rowIdx, selectedCell.colIdx));
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
      <GameBoard
        setSelectedCell={selectCell}
        selectedCell={selectedCell}
        scaleFactor={scaleFactor}
      />
      <NumPad
        handleNumKeyPress={handleNumKeyPress}
        scaleFactor={scaleFactor}
        isDraft={isDraft}
        setIsDraft={setIsDraft}
      />
    </div>
  );
}

export default PlayField;
