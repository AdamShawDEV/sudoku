import styles from "./modules/GameBoard.module.css";
import { useGameState } from "../hooks/gameState/gameStateContext";
import { computedStyles } from "../CONSTS";
import Cell from "./Cell";

function GameBoard({
  selectedCell,
  setSelectedCell,
  selectedNumberButton,
  scaleFactor,
}) {
  const { gameState } = useGameState();

  return (
    <div
      className={styles.gameBoard}
      style={computedStyles.gameBoard(scaleFactor)}
    >
      {gameState.gameBoard.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <Cell
            key={`${rowIdx} ${colIdx}`}
            rowIdx={rowIdx}
            colIdx={colIdx}
            selectedCell={selectedCell}
            selectedNumberButton={selectedNumberButton}
            scaleFactor={scaleFactor}
            cellStatus={cell.status}
            showErrors={gameState.settings.showErrors}
            draftNumbers={cell.draftNumbers}
            value={cell.value}
            setSelectedCell={setSelectedCell}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
