import { CELL_STATUS, GAME_STATUS } from "../../CONSTS";
import * as types from "./actionTypes";

export default function gameStateReducer(state, action) {
  const { type } = action;
  switch (type) {
    case types.ADD_NUMBER:
      // If cell value is a given value make no changes
      if (
        state.gameBoard[action.rowIdx][action.colIdx].status ===
        CELL_STATUS.GIVEN
      )
        return state;

      return {
        ...state,
        gameBoard: state.gameBoard.map((row, rowIdx) =>
          rowIdx === action.rowIdx
            ? row.map((cell, colIdx) =>
                colIdx === action.colIdx
                  ? cell.value === action.value
                    ? { ...cell, value: null }
                    : { ...cell, value: action.value }
                  : cell
              )
            : row
        ),
      };
    case types.LOAD_STATE:
      return {
        ...state,
        gameBoard: action.gameBoard,
        completedBoard: action.completedBoard,
        difficulty: action.difficulty,
        gameStatus: GAME_STATUS.PLAYING,
        loading: false,
      };
    case types.CHANGE_STATUS:
      return { ...state, gameStatus: action.newStatus };

    default:
      console.log("invalid action type");
      return state;
  }
}
