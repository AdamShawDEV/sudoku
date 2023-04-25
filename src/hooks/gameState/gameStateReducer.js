import { GAME_STATUS } from "../../CONSTS";
import * as types from "./actionTypes";

export default function gameStateReducer(state, action) {
  const { type } = action;
  switch (type) {
    case types.ADD_NUMBER:
      return {
        ...state,
        gameBoard: state.gameBoard.map((row, rowIdx) =>
          rowIdx === action.rowIdx
            ? row.map((cell, colIdx) =>
                colIdx === action.colIdx
                  ? { ...cell, value: action.value }
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
