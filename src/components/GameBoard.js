import styles from "./modules/GameBoard.module.css";
import { useGameState } from "../hooks/gameState/gameStateContext";
import {
  BASE_CELL_DIAMETER,
  BASE_GAP,
  BASE_FONT_SIZE,
  BASE_GAME_BOARD_DIAMETER,
  CELL_STATUS,
  BASE_DRAFT_FONT_SIZE,
} from "../CONSTS";

function GameBoard({ selectedCell, setSelectedCell, scaleFactor }) {
  const { gameState } = useGameState();

  if (!gameState.gameBoard) return null;

  return (
    <div
      className={styles.gameBoard}
      style={computedStyles.gameBoard(scaleFactor)}
    >
      {gameState.gameBoard.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <div
            key={`${rowIdx} ${colIdx}`}
            className={styles.cell}
            style={computedStyles.cell(
              rowIdx,
              colIdx,
              selectedCell,
              scaleFactor,
              cell.status === CELL_STATUS.GIVEN
            )}
            onClick={() => setSelectedCell({ rowIdx, colIdx })}
          >
            {cell.value}
            {cell.draftNumbers.map((draft, idx) => (
              <div
                key={draft}
                className={styles.draftNumber}
                style={computedStyles.draft(idx, scaleFactor)}
              >
                {draft}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

const computedStyles = {
  cell(rowIdx, colIdx, selectedCell, scaleFactor, isGiven) {
    const width = `${BASE_CELL_DIAMETER * scaleFactor}px`;
    const height = `${BASE_CELL_DIAMETER * scaleFactor}px`;
    const top = `${
      (rowIdx * (BASE_CELL_DIAMETER + BASE_GAP) +
        BASE_GAP * Math.floor(rowIdx / 3)) *
      scaleFactor
    }px`;
    const left = `${
      (colIdx * (BASE_CELL_DIAMETER + BASE_GAP) +
        BASE_GAP * Math.floor(colIdx / 3)) *
      scaleFactor
    }px`;
    const borderWidth = `${BASE_GAP * scaleFactor}px`;
    const fontSize = `${BASE_FONT_SIZE * scaleFactor}px`;

    let style = {
      width,
      height,
      top,
      left,
      borderWidth,
      fontSize,
    };

    if (isGiven) {
      style.fontWeight = 700;
      style.color = "black";
    }
    if (rowIdx === 2 || rowIdx === 5)
      style.borderBottomWidth = `${BASE_GAP * 2 * scaleFactor}px`;
    if (colIdx === 2 || colIdx === 5)
      style.borderRightWidth = `${BASE_GAP * 2 * scaleFactor}px`;
    if (rowIdx === selectedCell.rowIdx && colIdx === selectedCell.colIdx) {
      style.backgroundColor = "orange";
    } else if (
      rowIdx === selectedCell.rowIdx ||
      colIdx === selectedCell.colIdx
    ) {
      style.backgroundColor = "white";
    }

    return style;
  },
  gameBoard: (scaleFactor) => ({
    width: `${BASE_GAME_BOARD_DIAMETER * scaleFactor}px`,
    height: `${BASE_GAME_BOARD_DIAMETER * scaleFactor}px`,
  }),
  draft: (idx, scaleFactor) => ({
    left: `${33 * (idx % 3)}%`,
    top: `${33 * Math.floor(idx / 3)}%`,
    fontSize: `${BASE_DRAFT_FONT_SIZE * scaleFactor}px`,
    lineHeight: `${BASE_DRAFT_FONT_SIZE * scaleFactor}px`,
  }),
};

export default GameBoard;
