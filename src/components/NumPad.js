import styles from "./modules/NumPad.module.css";

function NumPad({ handleNumKeyPress }) {
  return (
    <div className={styles.keyPad}>
      <div className={styles.buttonRow}>
        <div className={styles.button}>undo</div>
        <div className={styles.button}>draft</div>
      </div>
      <div className={styles.keyRow}>
        {Array.from({ length: 9 }, (__, idx) => (
          <div
            key={idx}
            className={styles.numKey}
            onClick={() => handleNumKeyPress(idx + 1)}
          >
            <span>{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumPad;
