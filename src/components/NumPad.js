import styles from "./modules/NumPad.module.css";

function NumPad({ handleNumKeyPress }) {
  return (
    <div className={styles.numPad}>
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
  );
}

export default NumPad;
