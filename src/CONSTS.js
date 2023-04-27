export const CELL_STATUS = {
  GIVEN: "given",
  TO_GUESS: "to guess",
  WRONG_GUESS: "wrong guess",
  CORRECT_GUESS: "correct guess",
};

export const GAME_STATUS = {
  PLAYING: "playing",
  WON: "won",
  INITIAL: "initial",
};

export const DIFFICULTY = {
  EASY: 5,
  MEDIUM: 50,
  HARD: 100,
};

export const HEADER_HEIGHT = 40;

export const BASE_CELL_DIAMETER = 60;
export const BASE_GAP = 4;
export const BASE_FONT_SIZE = 40;
export const BASE_GAME_BOARD_DIAMETER = 588;

export const BASE_BUTTON_GAP = 100;
export const BASE_BUTTON_FONT_SIZE = 40;
export const BASE_PADDING = 10;
export const BASE_KEY_WIDTH = 60;
export const BASE_KEY_HEIGHT = 80;
export const BASE_KEY_FONT_SIZE = 40;
export const BASE_KEY_BORDER_RADIUS = 15;

export const BASE_DRAFT_FONT_SIZE = 15;

export const BASE_PLAY_FIELD_HEIGHT =
  BASE_GAME_BOARD_DIAMETER + BASE_PADDING * 2 + 170;

export const computedStyles = {
  cell(
    rowIdx,
    colIdx,
    selectedCell,
    scaleFactor,
    cellStatus,
    showErrors,
    selectedNumber
  ) {
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
    if (
      (rowIdx === selectedCell.rowIdx && colIdx === selectedCell.colIdx) ||
      selectedNumber
    ) {
      style.backgroundColor = "#5ad891";
    } else if (
      rowIdx === selectedCell.rowIdx ||
      colIdx === selectedCell.colIdx
    ) {
      style.backgroundColor = "#d6f5e3";
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
