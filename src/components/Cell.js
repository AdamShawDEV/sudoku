import styles from "./modules/Cell.module.css";
import {
  BASE_CELL_DIAMETER,
  BASE_GAP,
  BASE_FONT_SIZE,
  CELL_STATUS,
  BASE_DRAFT_FONT_SIZE,
} from "../CONSTS";

function Cell({
  rowIdx,
  colIdx,
  selectedCell,
  scaleFactor,
  cellStatus,
  showErrors,
  draftNumbers,
  value,
  setSelectedCell,
  selectedNumberButton,
}) {
  return (
    <button
      className={`${styles.cell} ${
        (rowIdx === selectedCell.rowIdx && colIdx === selectedCell.colIdx) ||
        (selectedNumberButton && selectedNumberButton === value)
          ? styles.gameBoardSelectedCellBackground
          : rowIdx === selectedCell.rowIdx || colIdx === selectedCell.colIdx
          ? styles.gameBoardSelectedRowColBackground
          : ""
      } ${
        cellStatus === CELL_STATUS.GIVEN
          ? styles.gameBoardGivenNumberColor
          : cellStatus === CELL_STATUS.WRONG_GUESS && showErrors
          ? styles.gameBoardWrongNumberColor
          : ""
      }`}
      style={computedStyles.cell(rowIdx, colIdx, scaleFactor)}
      onClick={() => setSelectedCell({ rowIdx, colIdx })}
    >
      {value}

      {/* draft numbers */}
      {Array.from({ length: 9 }, (__, idx) => {
        if (draftNumbers.includes(idx + 1)) {
          return (
            <div
              key={idx}
              className={styles.draftNumber}
              style={computedStyles.draft(idx, scaleFactor)}
            >
              {idx + 1}
            </div>
          );
        }
        return null;
      })}
    </button>
  );
}

export default Cell;

const computedStyles = {
  cell(rowIdx, colIdx, scaleFactor) {
    // calculate size and position based on window size
    let style = {
      width: `${BASE_CELL_DIAMETER * scaleFactor}px`,
      height: `${BASE_CELL_DIAMETER * scaleFactor}px`,
      top: `${
        (rowIdx * (BASE_CELL_DIAMETER + BASE_GAP) +
          BASE_GAP * Math.floor(rowIdx / 3)) *
        scaleFactor
      }px`,
      left: `${
        (colIdx * (BASE_CELL_DIAMETER + BASE_GAP) +
          BASE_GAP * Math.floor(colIdx / 3)) *
        scaleFactor
      }px`,
      borderWidth: `${BASE_GAP * scaleFactor}px`,
      fontSize: `${BASE_FONT_SIZE * scaleFactor}px`,

      // calculate anmation delay based on the position of the cell
      animationDelay: `${0.08 * rowIdx + 0.08 * colIdx}s`,
    };

    // set border width based on position
    if (rowIdx === 2 || rowIdx === 5)
      style.borderBottomWidth = `${BASE_GAP * 2 * scaleFactor}px`;
    if (colIdx === 2 || colIdx === 5)
      style.borderRightWidth = `${BASE_GAP * 2 * scaleFactor}px`;

    return style;
  },
  draft: (idx, scaleFactor) => ({
    // set position and size of draft numbers
    left: `${33 * (idx % 3)}%`,
    top: `${33 * Math.floor(idx / 3)}%`,
    fontSize: `${BASE_DRAFT_FONT_SIZE * scaleFactor}px`,
    lineHeight: `${BASE_DRAFT_FONT_SIZE * scaleFactor}px`,
  }),
};
