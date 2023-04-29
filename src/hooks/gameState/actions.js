import * as types from "./actionTypes";

function addNumber(value, rowIdx, colIdx) {
  return {
    type: types.ADD_NUMBER,
    value,
    rowIdx,
    colIdx,
  };
}

function startGame(gameBoard, completedBoard, difficulty) {
  return {
    type: types.START_GAME,
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
function gameWon() {
  return {
    type: types.GAME_WON,
  };
}

function changeSettings(newSettings) {
  return {
    type: types.CHANGE_SETTINGS,
    newSettings,
  };
}

function undo() {
  return {
    type: types.UNDO,
  }
}

export {
  addNumber,
  startGame,
  changeStatus,
  addDraft,
  resetGame,
  gameWon,
  changeSettings,
  undo,
};
