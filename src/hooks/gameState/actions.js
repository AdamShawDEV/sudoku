import * as types from "./actionTypes";

function addNumber(value, rowIdx, colIdx) {
  return {
    type: types.ADD_NUMBER,
    value,
    rowIdx,
    colIdx,
  };
}

function loadState(gameBoard) {
  return {
    type: types.LOAD_STATE,
    gameBoard,
  };
}

export { addNumber, loadState };
