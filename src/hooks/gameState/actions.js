import * as types from "./actionTypes";

function addNumber(value, rowIdx, colIdx) {
  return {
    type: types.ADD_NUMBER,
    value,
    rowIdx,
    colIdx,
  };
}

function loadBoard(gameBoard) {
  return {
    type: types.LOAD_BOARD,
    gameBoard,
  };
}

export { addNumber, loadBoard };
