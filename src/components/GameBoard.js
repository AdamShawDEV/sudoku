import styles from "./modules/GameBoard.module.css";
import { useGameState } from "../hooks/gameState/gameStateContext";
import { BASE_GAME_BOARD_DIAMETER } from "../CONSTS";
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

const computedStyles = {
  gameBoard: (scaleFactor) => ({
    width: `${BASE_GAME_BOARD_DIAMETER * scaleFactor}px`,
    height: `${BASE_GAME_BOARD_DIAMETER * scaleFactor}px`,
  }),
};
