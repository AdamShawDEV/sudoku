import styles from "./modules/TimeDisplay.module.css";

function TimeDisplay({ seconds }) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hours * 3600) / 60);
  const secs = seconds % 60;
  return (
    <div className={styles.timeDisplay}>
      {hours > 0 && <>{hours}:</>}
      {mins.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
      :
      {secs.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
    </div>
  );
}

export default TimeDisplay;
