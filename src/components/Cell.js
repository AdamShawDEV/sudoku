import styles from "./modules/Cell.module.css";
import {
  BASE_CELL_DIAMETER,
  BASE_GAP,
  BASE_FONT_SIZE,
  CELL_STATUS,
  BASE_DRAFT_FONT_SIZE,
} from "../CONSTS";
import useTheme from "../hooks/theme/useTheme";

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
  const { currentTheme } = useTheme();

  return (
    <div
      className={styles["cell-" + currentTheme]}
      style={computedStyles.cell(
        rowIdx,
        colIdx,
        selectedCell,
        scaleFactor,
        cellStatus,
        showErrors,
        selectedNumberButton && selectedNumberButton === value,
        currentTheme
      )}
      onClick={() => setSelectedCell({ rowIdx, colIdx })}
    >
      {value}

      {/* draft numbers */}
      {Array.from({ length: 9 }, (__, idx) => {
        if (draftNumbers.includes(idx + 1)) {
          return (
            <div
              key={idx}
              className={styles["draftNumber-" + currentTheme]}
              style={computedStyles.draft(idx, scaleFactor)}
            >
              {idx + 1}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default Cell;

const computedStyles = {
  cell(
    rowIdx,
    colIdx,
    selectedCell,
    scaleFactor,
    cellStatus,
    showErrors,
    selectedNumber,
    currentTheme
  ) {
    // calculate size and position based on window size
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

    // calculate anmation delay based on the position of the cell
    const animationDelay = `${0.08 * rowIdx + 0.08 * colIdx}s`;

    let style = {
      width,
      height,
      top,
      left,
      borderWidth,
      fontSize,
      animationDelay,
    };

    // style the text if is a given number
    if (cellStatus === CELL_STATUS.GIVEN) {
      style.fontWeight = 700;
      style.color = currentTheme === "light" ? "black" : "#F2F2F2";
    } else if (cellStatus === CELL_STATUS.WRONG_GUESS && showErrors) {
      style.color = "red";
    }

    // set border width based on position
    if (rowIdx === 2 || rowIdx === 5)
      style.borderBottomWidth = `${BASE_GAP * 2 * scaleFactor}px`;
    if (colIdx === 2 || colIdx === 5)
      style.borderRightWidth = `${BASE_GAP * 2 * scaleFactor}px`;

    // style selected cell
    if (
      (rowIdx === selectedCell.rowIdx && colIdx === selectedCell.colIdx) ||
      selectedNumber
    ) {
      style.backgroundColor =
        currentTheme === "light" ? "#2fcc71ff" : "#54936E";
      // style cell on the same row and column of the secected cess
    } else if (
      rowIdx === selectedCell.rowIdx ||
      colIdx === selectedCell.colIdx
    ) {
      style.backgroundColor = currentTheme === "light" ? "#d6f5e3" : "#467559";
    }

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
