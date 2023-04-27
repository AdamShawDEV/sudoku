import * as types from "./actionTypes";

function addNumber(value, rowIdx, colIdx) {
  return {
    type: types.ADD_NUMBER,
    value,
    rowIdx,
    colIdx,
  };
}

function loadState(gameBoard, completedBoard, difficulty) {
  return {
    type: types.LOAD_STATE,
    gameBoard,
    completedBoard,
    difficulty,
  };
}

function changeStatus(newStatus) {
  return {
    type: types.CHANGE_STATUS,
    newStatus,
  };
}

function addDraft(value, rowIdx, colIdx) {
  return {
    type: types.ADD_DRAFT,
    value,
    rowIdx,
    colIdx,
  };
}

function resetGame() {
  return {
    type: types.RESET_GAME,
  };
}

export { addNumber, loadState, changeStatus, addDraft, resetGame };
