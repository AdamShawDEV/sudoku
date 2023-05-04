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

export const emptyCell = {
  value: null,
  status: null,
  draftNumbers: [],
};

export const themes = ["dark", "light"];

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
