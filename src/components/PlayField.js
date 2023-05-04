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
  GAME_STATUS,
  HEADER_HEIGHT,
} from "../CONSTS";
import GameWonModal from "./GameWonModal";
import { resetGame } from "../hooks/gameState/actions";
import useTheme from "../hooks/theme/useTheme";

const emptySelection = { rowIdx: null, colIdx: null };

function PlayField() {
  const [selectedCell, setSelectedCell] = useState(emptySelection);
  const [isDraft, setIsDraft] = useState(false);
  const [selectedNumberButton, setSelectedNumberButton] = useState(null);
  const { windowDimentions } = useWindowDimensions();
  const { dispatch, gameState } = useGameState();
  const { currentTheme } = useTheme();

  function handleNumKeyPress(value) {
    // cell selected
    if (selectedCell.rowIdx != null && selectedCell.colIdx != null) {
      // add numbers to the cell based on whether draft mode is enabled
      isDraft
        ? dispatch(addDraft(value, selectedCell.rowIdx, selectedCell.colIdx))
        : dispatch(addNumber(value, selectedCell.rowIdx, selectedCell.colIdx));
      setSelectedCell(emptySelection);
    } else {
      // set selected number
      setSelectedNumberButton((curr) => {
        if (curr === value) return null;
        else return value;
      });
    }
  }

  function selectCell(cell) {
    if (selectedNumberButton) {
      // if number selected add number to cell base on if draft mode is enabled
      isDraft
        ? dispatch(addDraft(selectedNumberButton, cell.rowIdx, cell.colIdx))
        : dispatch(addNumber(selectedNumberButton, cell.rowIdx, cell.colIdx));
    } else {
      // select cell
      setSelectedCell((curr) => {
        if (curr.rowIdx === cell.rowIdx && curr.colIdx === cell.colIdx)
          return emptySelection;

        return cell;
      });
    }
  }

  // set the scale base on window dimensions
  const scaleFactor = Math.min(
    (windowDimentions.height - HEADER_HEIGHT) / BASE_PLAY_FIELD_HEIGHT,
    windowDimentions.width / (BASE_GAME_BOARD_DIAMETER + 20),
    1
  );

  return (
    <>
      <div className={styles["playField-" + currentTheme]}>
        <GameBoard
          selectedNumberButton={selectedNumberButton}
          setSelectedCell={selectCell}
          selectedCell={selectedCell}
          scaleFactor={scaleFactor}
        />
        <NumPad
          handleNumKeyPress={handleNumKeyPress}
          scaleFactor={scaleFactor}
          isDraft={isDraft}
          setIsDraft={setIsDraft}
          selectedNumberButton={selectedNumberButton}
        />
      </div>
      {/* Display game won modal */}
      {gameState.gameStatus === GAME_STATUS.WON && (
        <GameWonModal handleClose={() => dispatch(resetGame())} />
      )}
    </>
  );
}

export default PlayField;
