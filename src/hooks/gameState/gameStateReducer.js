import { CELL_STATUS, GAME_STATUS } from "../../CONSTS";
import * as types from "./actionTypes";

export default function gameStateReducer(state, action) {
  const { type } = action;
  switch (type) {
    case types.ADD_NUMBER:
      if (
        state.gameBoard[action.rowIdx][action.colIdx].status ===
        CELL_STATUS.GIVEN
      )
        return state;

      const isCorrect =
        action.value ===
        state.completedBoard[action.rowIdx][action.colIdx].value;

      return {
        ...state,
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
    case types.LOAD_STATE:
      return {
        ...state,
        gameBoard: action.gameBoard,
        completedBoard: action.completedBoard,
        difficulty: action.difficulty,
        perfectGame: true,
        gameStatus: GAME_STATUS.PLAYING,
        loading: false,
      };
    case types.CHANGE_STATUS:
      return { ...state, gameStatus: action.newStatus };
    case types.ADD_DRAFT:
      const { value, rowIdx, colIdx } = action;
      if (
        state.gameBoard[rowIdx][colIdx].value ||
        state.gameBoard[rowIdx][colIdx].status !== CELL_STATUS.TO_GUESS
      )
        return state;

      return {
        ...state,
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
      };
    case types.RESET_GAME:
      return {
        ...state,
        gameBoard: null,
        completedBoard: null,
        difficulty: null,
        perfectGame: true,
        gameStatus: GAME_STATUS.INITIAL,
      };
    default:
      console.log("invalid action type");
      return state;
  }
}
