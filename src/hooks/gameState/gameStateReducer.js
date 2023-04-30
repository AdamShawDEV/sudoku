import { CELL_STATUS, GAME_STATUS } from "../../CONSTS";
import * as types from "./actionTypes";

export default function gameStateReducer(state, action) {
  const { type } = action;
  switch (type) {
    case types.ADD_NUMBER:
      // if given number ignore
      if (
        state.gameBoard[action.rowIdx][action.colIdx].status ===
        CELL_STATUS.GIVEN
      )
        return state;

      // check if is the correct number
      const isCorrect =
        action.value ===
        state.completedBoard[action.rowIdx][action.colIdx].value;

      // store backuo of cell for undo
      const backup = {...state.gameBoard[action.rowIdx][action.colIdx]};

      // insert new value into the game board
      return {
        ...state,
        moves: [...state.moves, {...action, backup}],
        gameBoard: state.gameBoard.map((row, rowIdx) =>
          rowIdx === action.rowIdx
            ? row.map((cell, colIdx) =>
                colIdx === action.colIdx
                  ? cell.value === action.value
                    ? { ...cell, value: null, ststus: CELL_STATUS.TO_GUESS }
                    : {
                        ...cell,
                        value: action.value,
                        draftNumbers: [],
                        status: isCorrect
                          ? CELL_STATUS.CORRECT_GUESS
                          : CELL_STATUS.WRONG_GUESS,
                      }
                  : cell
              )
            : row
        ),
        perfectGame: state.perfectGame ? isCorrect : state.perfectGame,
      };
    case types.START_GAME:
      // initialize new game with given game board and answer board
      return {
        ...state,
        gameBoard: action.gameBoard,
        completedBoard: action.completedBoard,
        difficulty: action.difficulty,
        moves: [],
        perfectGame: true,
        gameStatus: GAME_STATUS.PLAYING,
        loading: false,
        stats: { ...state.stats, gamesPlayed: state.stats.gamesPlayed + 1 },
      };
    case types.CHANGE_STATUS:
      // change the status of the game
      return { ...state, gameStatus: action.newStatus };
    case types.ADD_DRAFT: {
      const { value, rowIdx, colIdx } = action;
      // toggle draft value
      if (
        state.gameBoard[rowIdx][colIdx].value ||
        state.gameBoard[rowIdx][colIdx].status !== CELL_STATUS.TO_GUESS
      )
        return state;

      // backup cell state for undo
      const backup = {...state.gameBoard[rowIdx][colIdx]};

      // update gameboard with new value
      return {
        ...state,
        moves: [...state.moves, {...action, backup}],
        gameBoard: state.gameBoard.map((row, rIdx) =>
          rIdx === rowIdx
            ? row.map((cell, cIdx) =>
                cIdx === colIdx
                  ? {
                      ...cell,
                      draftNumbers: cell.draftNumbers.includes(value)
                        ? cell.draftNumbers.filter((num) => num !== value)
                        : [...cell.draftNumbers, value].sort((a, b) => a - b),
                    }
                  : cell
              )
            : row
        ),
      }};
    case types.RESET_GAME:
      // reset the gamestate excluding the stetting and stats
      return {
        ...state,
        gameBoard: null,
        moves: [],
        completedBoard: null,
        difficulty: null,
        perfectGame: true,
        gameStatus: GAME_STATUS.INITIAL,
      };
    case types.GAME_WON:
      // register a won game
      return {
        ...state,
        gameStatus: GAME_STATUS.WON,
        stats: {
          ...state.stats,
          gamesWon: state.stats.gamesWon + 1,
          perfectGames: state.perfectGame
            ? state.stats.perfectGames + 1
            : state.stats.perfectGames,
          currentStreak: state.perfectGame ? state.stats.currentStreak + 1 : 0,
          longestStreak:
            state.stats.currentStreak + 1 > state.stats.longestStreak
              ? state.stats.currentStreak + 1
              : state.stats.longestStreak,
        },
      };

    case types.CHANGE_SETTINGS:
      // save setting changed
      return {
        ...state,
        settings: { ...state.settings, ...action.newSettings },
      };
    case types.UNDO:
      // undo last move
      if (!state.moves.length) return state;
      
      const toUndo = state.moves[state.moves.length - 1];
      console.log(toUndo);

      return {
        ...state,
        moves: [...state.moves.slice(0, state.moves.length - 1)],
        gameBoard: state.gameBoard.map((row, rIdx) =>
          rIdx === toUndo.rowIdx
            ? row.map((cell, cIdx) =>
                cIdx === toUndo.colIdx
                  ? {
                      ...toUndo.backup,
                    }
                  : cell
              )
            : row
        ),
      };
      

    default:
      console.log("invalid action type");
      return state;
  }
}
