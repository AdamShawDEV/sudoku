import styles from "./modules/Cell.module.css";

function Cell({
  rowIdx,
  colIdx,
  selectedCell,
  scaleFactor,
  cellStatus,
  showErrors,
  draftNumbers,
  value,
}) {
  return (
    <div
      className={styles.cell}
      style={computedStyles.cell(
        rowIdx,
        colIdx,
        selectedCell,
        scaleFactor,
        cellStatus,
        showErrors
      )}
      onClick={() => setSelectedCell({ rowIdx, colIdx })}
    >
      {value}
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
      })}
    </div>
  );
}

const computedStyles = {
  cell(rowIdx, colIdx, selectedCell, scaleFactor, cellStatus, showErrors) {
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

    if (cellStatus === CELL_STATUS.GIVEN) {
      style.fontWeight = 700;
      style.color = "black";
    } else if (cellStatus === CELL_STATUS.WRONG_GUESS && showErrors) {
      style.color = "red";
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

export default Cell;
