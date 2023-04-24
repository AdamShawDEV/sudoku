import * as types from "./actionTypes";
import { loadBoard } from "./actions";

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
    case types.LOAD_BOARD:
      return {
        ...state,
        gameBoard: action.gameBoard,
      };

    default:
      console.log("invalid action type");
      return state;
  }
}
