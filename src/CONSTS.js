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

export const themeColors = {
  light: {
    "--menuBackground": "#F2F2F2",
    "--subHeadingTextColor": "#646464",
    "--menuButtonBorderColor": "#282c34",
    "--menuButtonBackground": "#F2F2F2",
    "--menuButtonTextColor": "#282c34",
    "--menuButtonHoverBackground": "#282c34",
    "--menuButtonHoverTextColor": "#fff",
    "--heroButtonBorderColor": "#2ecc71ff",
    "--heroButtonBackground": "#2ecc71ff",
    "--heroButtonTextColor": "#282c34",
    "--heroButtonHoverBackground": "rgba(0, 0, 0, 0)",
    "--heroButtonHoverTextColor": "#2ecc71ff",
    "--headerBackground": "#979797ff",
    "--headerForeground": "#000",
    "--playFieldBackground": "#CACACA",
    "--gameBoardBorder": "#000",
    "--gameBoardBackground": "#f6f6f6ff",
    "--gameBoardGivenNumberColor": "#000",
    "--gameBoardWrongNumberColor": "red",
    "--gameBoardCorrectGuess": "#979797",
    "--gameBoardSelectedCellBackground": "#2ECC71",
    "--gameBoardSelectedRowColBackground": "#d6f5e3",
    "--draftNumberHighlightedColor": "#000",
    "--draftNumbersScondaryColor": "#cacaca",
    "--numpadKeyColor": "#000",
    "--numpadkeyBorderColor": "#000",
    "--numpadKeyActiveColor": "#fff",
    "--numpadkeyActiveBackgroundColor": "#000",
    "--numpadkeyActiveBorderColor": "#000",
    "--numpadKeySelectedColor": "#fff",
    "--numpadkeySelectedBackgroundColor": "#000",
    "--numpadkeySelectedBorderColor": "#000",
    "--numpadkeyDisabledColor": "#fff",
    "--numpadkeyDisabledBorderColor": "#fff",
  },
  dark: {
    "--menuBackground": "#282c34",
    "--subHeadingTextColor": "#646464",
    "--menuButtonBorderColor": "#fff",
    "--menuButtonBackground": "#282c34",
    "--menuButtonTextColor": "#fff",
    "--menuButtonHoverBackground": "#fff",
    "--menuButtonHoverTextColor": "#282c34",
    "--heroButtonBorderColor": "#2ecc71ff",
    "--heroButtonBackground": "#2ecc71ff",
    "--heroButtonTextColor": "#282c34",
    "--heroButtonHoverBackground": "rgba(0, 0, 0, 0)",
    "--heroButtonHoverTextColor": "#2ecc71ff",
    "--headerBackground": "#000",
    "--headerForeground": "#CACACA",
    "--playFieldBackground": "#373737",
    "--gameBoardBorder": "#CAC9C9",
    "--gameBoardBackground": "#373737",
    "--gameBoardGivenNumberColor": "#CAC9C9",
    "--gameBoardWrongNumberColor": "red",
    "--gameBoardCorrectGuess": "#979797",
    "--gameBoardSelectedCellBackground": "#1a9f53",
    "--gameBoardSelectedRowColBackground": "#467559",
    "--draftNumberHighlightedColor": "#979797",
    "--draftNumbersScondaryColor": "#000",
    "--numpadKeyColor": "#CAC9C9",
    "--numpadkeyBorderColor": "#CAC9C9",
    "--numpadKeyActiveColor": "#000",
    "--numpadkeyActiveBackgroundColor": "#CAC9C9",
    "--numpadkeyActiveBorderColor": "#CAC9C9",
    "--numpadKeySelectedColor": "#000",
    "--numpadkeySelectedBackgroundColor": "#CAC9C9",
    "--numpadkeySelectedBorderColor": "#CAC9C9",
    "--numpadkeyDisabledColor": "#000",
    "--numpadkeyDisabledBorderColor": "#000",
  },
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
export const BASE_NUMREMAINING_TOP = 2;
export const BASE_NUMREMAINING_RIGHT = 4;
export const BASE_NUMREMAINING_FONT_SIZE = 16;

export const BASE_DRAFT_FONT_SIZE = 15;

export const BASE_PLAY_FIELD_HEIGHT =
  BASE_GAME_BOARD_DIAMETER + BASE_PADDING * 2 + 170;
