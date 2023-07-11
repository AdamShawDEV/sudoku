import styles from "./modules/InlineSpinner.module.css";

function InlineSpinner({ height }) {
  return (
    <div className={styles.spinnerContainer}>
      <div
        className={styles.spinner}
        style={height ? { height, width: height } : {}}
      ></div>
    </div>
  );
}

export default InlineSpinner;
