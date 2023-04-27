import styles from "./modules/Cell.module.css";
import { computedStyles } from "../CONSTS";

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
    <div
      className={styles.cell}
      style={computedStyles.cell(
        rowIdx,
        colIdx,
        selectedCell,
        scaleFactor,
        cellStatus,
        showErrors,
        selectedNumberButton && selectedNumberButton === value
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

export default Cell;
