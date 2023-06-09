import styles from "./modules/NumPad.module.css";
import {
  BASE_BUTTON_FONT_SIZE,
  BASE_BUTTON_GAP,
  BASE_GAME_BOARD_DIAMETER,
  BASE_KEY_BORDER_RADIUS,
  BASE_KEY_HEIGHT,
  BASE_KEY_WIDTH,
  BASE_PADDING,
} from "../CONSTS";
import { useGameState } from "../hooks/gameState/gameStateContext";
import { undo } from "../hooks/gameState/actions";

function NumPad({
  handleNumKeyPress,
  scaleFactor,
  isDraft,
  setIsDraft,
  selectedNumberButton,
}) {
  const { gameState, dispatch } = useGameState();

  return (
    <div className={styles.keyPad} style={computedStyles.keyPad(scaleFactor)}>
      <div
        className={styles.buttonRow}
        style={computedStyles.buttonRow(scaleFactor)}
      >
        <div
          className={`${
            !gameState.moves.length ? styles.buttonDisabled : styles.button
          }`}
          style={computedStyles.button(scaleFactor)}
          onClick={() => dispatch(undo())}
        >
          undo
        </div>

        <div
          className={`${styles.button} ${isDraft ? styles.buttonSelected : ""}`}
          style={computedStyles.button(scaleFactor)}
          onClick={() => setIsDraft((curr) => !curr)}
        >
          draft
        </div>
      </div>
      <div className={styles.keyRow}>
        {Array.from({ length: 9 }, (__, idx) => (
          <button
            key={idx}
            className={`${styles.numKey} ${
              selectedNumberButton === idx + 1 ? styles.buttonSelected : {}
            }`}
            style={computedStyles.numKey(scaleFactor)}
            onClick={() => handleNumKeyPress(idx + 1)}
          >
            <span>{idx + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// style base on the window dimensions
const computedStyles = {
  keyPad: (scaleFactor) => ({
    gap: `${BASE_PADDING * scaleFactor}px`,
    paddingTop: `${BASE_PADDING * scaleFactor}px`,
    width: `${BASE_GAME_BOARD_DIAMETER * scaleFactor}px`,
  }),
  buttonRow: (scaleFactor) => ({
    gap: `${BASE_BUTTON_GAP * scaleFactor}px`,
  }),
  button: (scaleFactor) => ({
    fontSize: `${BASE_BUTTON_FONT_SIZE * scaleFactor}px`,
    lineHeight: `${BASE_BUTTON_FONT_SIZE * scaleFactor}px`,
    borderRadius: `${BASE_KEY_BORDER_RADIUS * scaleFactor}px`,
    padding: `${BASE_PADDING * scaleFactor}px`,
  }),
  numKey: (scaleFactor) => ({
    width: `${BASE_KEY_WIDTH * scaleFactor}px`,
    height: `${BASE_KEY_HEIGHT * scaleFactor}px`,
    fontSize: `${BASE_BUTTON_FONT_SIZE * scaleFactor}px`,
    borderRadius: `${BASE_KEY_BORDER_RADIUS * scaleFactor}px`,
  }),
};

export default NumPad;
