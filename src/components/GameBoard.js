import styles from "./modules/GameBoard.module.css";
import { useGameState } from "../hooks/gameState/gameStateContext";

const computedStyles = {
  cell(rowIdx, colIdx, selectedCell) {
    let style = {
      top: `${rowIdx * 31 + 1 * Math.floor(rowIdx / 3)}px`,
      left: `${colIdx * 31 + 1 * Math.floor(colIdx / 3)}px`,
    };

    if (rowIdx === 2 || rowIdx === 5) style.borderBottom = "2px solid black";
    if (colIdx === 2 || colIdx === 5) style.borderRight = "2px solid black";
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
};

function GameBoard({ selectedCell, setSelectedCell }) {
  const { gameState } = useGameState();

  return (
    <div className={styles.gameBoard}>
      {gameState.gameBoard.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <div
            key={`${rowIdx} ${colIdx}`}
            className={styles.cell}
            style={computedStyles.cell(rowIdx, colIdx, selectedCell)}
            onClick={() => setSelectedCell({ rowIdx, colIdx })}
          >
            {cell.value}
          </div>
        ))
      )}
    </div>
  );
}

export default GameBoard;
