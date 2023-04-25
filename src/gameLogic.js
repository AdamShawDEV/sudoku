import { CELL_STATUS } from "./CONSTS";

let counter;

const emptyCell = {
  value: null,
  status: null,
};

function createEmptyBoard() {
  const initailGameBoard = Array(9)
    .fill(0)
    .map((i) => Array(9).fill(null));

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      initailGameBoard[row][col] = { ...emptyCell };
    }
  }
  return initailGameBoard;
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function solveBoard(gameBoard) {
  let row;
  let col;
  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;
    if (!gameBoard[row][col].value) {
      shuffle(numbers);
      for (const value of numbers) {
        // if value not in current row
        if (!gameBoard[row].find((cell) => cell.value === value)) {
          if (
            !gameBoard
              .map((row) => row[col])
              .find((cell) => cell.value === value)
          ) {
            let square = [];
            if (row < 3) {
              if (col < 3) {
                square = [
                  gameBoard[0][0],
                  gameBoard[0][1],
                  gameBoard[0][2],
                  gameBoard[1][0],
                  gameBoard[1][1],
                  gameBoard[1][2],
                  gameBoard[2][0],
                  gameBoard[2][1],
                  gameBoard[2][2],
                ];
              } else if (col < 6) {
                square = [
                  gameBoard[0][3],
                  gameBoard[0][4],
                  gameBoard[0][5],
                  gameBoard[1][3],
                  gameBoard[1][4],
                  gameBoard[1][5],
                  gameBoard[2][3],
                  gameBoard[2][4],
                  gameBoard[2][5],
                ];
              } else {
                square = [
                  gameBoard[0][6],
                  gameBoard[0][7],
                  gameBoard[0][8],
                  gameBoard[1][6],
                  gameBoard[1][7],
                  gameBoard[1][8],
                  gameBoard[2][6],
                  gameBoard[2][7],
                  gameBoard[2][8],
                ];
              }
            } else if (row < 6) {
              if (col < 3) {
                square = [
                  gameBoard[3][0],
                  gameBoard[3][1],
                  gameBoard[3][2],
                  gameBoard[4][0],
                  gameBoard[4][1],
                  gameBoard[4][2],
                  gameBoard[5][0],
                  gameBoard[5][1],
                  gameBoard[5][2],
                ];
              } else if (col < 6) {
                square = [
                  gameBoard[3][3],
                  gameBoard[3][4],
                  gameBoard[3][5],
                  gameBoard[4][3],
                  gameBoard[4][4],
                  gameBoard[4][5],
                  gameBoard[5][3],
                  gameBoard[5][4],
                  gameBoard[5][5],
                ];
              } else {
                square = [
                  gameBoard[3][6],
                  gameBoard[3][7],
                  gameBoard[3][8],
                  gameBoard[4][6],
                  gameBoard[4][7],
                  gameBoard[4][8],
                  gameBoard[5][6],
                  gameBoard[5][7],
                  gameBoard[5][8],
                ];
              }
            } else {
              if (col < 3) {
                square = [
                  gameBoard[6][0],
                  gameBoard[6][1],
                  gameBoard[6][2],
                  gameBoard[7][0],
                  gameBoard[7][1],
                  gameBoard[7][2],
                  gameBoard[8][0],
                  gameBoard[8][1],
                  gameBoard[8][2],
                ];
              } else if (col < 6) {
                square = [
                  gameBoard[6][3],
                  gameBoard[6][4],
                  gameBoard[6][5],
                  gameBoard[7][3],
                  gameBoard[7][4],
                  gameBoard[7][5],
                  gameBoard[8][3],
                  gameBoard[8][4],
                  gameBoard[8][5],
                ];
              } else {
                square = [
                  gameBoard[6][6],
                  gameBoard[6][7],
                  gameBoard[6][8],
                  gameBoard[7][6],
                  gameBoard[7][7],
                  gameBoard[7][8],
                  gameBoard[8][6],
                  gameBoard[8][7],
                  gameBoard[8][8],
                ];
              }
            }

            if (!square.find((cell) => cell.value === value)) {
              gameBoard[row][col].value = value;
              gameBoard[row][col].status = CELL_STATUS.GIVEN;

              if (checkBoard(gameBoard)) {
                counter += 1;
                break;
              } else {
                if (solveBoard(gameBoard)) {
                  return true;
                }
              }
            }
          }
        }
      }
      break;
    }
  }
  gameBoard[row][col].value = null;
  gameBoard[row][col].status = CELL_STATUS.TO_GUESS;
  return false;
}

function fillBoard(gameBoard) {
  let row;
  let col;
  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;
    if (!gameBoard[row][col].value) {
      shuffle(numbers);
      for (const value of numbers) {
        // if value not in current row
        if (!gameBoard[row].find((cell) => cell.value === value)) {
          if (
            !gameBoard
              .map((row) => row[col])
              .find((cell) => cell.value === value)
          ) {
            let square = [];
            if (row < 3) {
              if (col < 3) {
                square = [
                  gameBoard[0][0],
                  gameBoard[0][1],
                  gameBoard[0][2],
                  gameBoard[1][0],
                  gameBoard[1][1],
                  gameBoard[1][2],
                  gameBoard[2][0],
                  gameBoard[2][1],
                  gameBoard[2][2],
                ];
              } else if (col < 6) {
                square = [
                  gameBoard[0][3],
                  gameBoard[0][4],
                  gameBoard[0][5],
                  gameBoard[1][3],
                  gameBoard[1][4],
                  gameBoard[1][5],
                  gameBoard[2][3],
                  gameBoard[2][4],
                  gameBoard[2][5],
                ];
              } else {
                square = [
                  gameBoard[0][6],
                  gameBoard[0][7],
                  gameBoard[0][8],
                  gameBoard[1][6],
                  gameBoard[1][7],
                  gameBoard[1][8],
                  gameBoard[2][6],
                  gameBoard[2][7],
                  gameBoard[2][8],
                ];
              }
            } else if (row < 6) {
              if (col < 3) {
                square = [
                  gameBoard[3][0],
                  gameBoard[3][1],
                  gameBoard[3][2],
                  gameBoard[4][0],
                  gameBoard[4][1],
                  gameBoard[4][2],
                  gameBoard[5][0],
                  gameBoard[5][1],
                  gameBoard[5][2],
                ];
              } else if (col < 6) {
                square = [
                  gameBoard[3][3],
                  gameBoard[3][4],
                  gameBoard[3][5],
                  gameBoard[4][3],
                  gameBoard[4][4],
                  gameBoard[4][5],
                  gameBoard[5][3],
                  gameBoard[5][4],
                  gameBoard[5][5],
                ];
              } else {
                square = [
                  gameBoard[3][6],
                  gameBoard[3][7],
                  gameBoard[3][8],
                  gameBoard[4][6],
                  gameBoard[4][7],
                  gameBoard[4][8],
                  gameBoard[5][6],
                  gameBoard[5][7],
                  gameBoard[5][8],
                ];
              }
            } else {
              if (col < 3) {
                square = [
                  gameBoard[6][0],
                  gameBoard[6][1],
                  gameBoard[6][2],
                  gameBoard[7][0],
                  gameBoard[7][1],
                  gameBoard[7][2],
                  gameBoard[8][0],
                  gameBoard[8][1],
                  gameBoard[8][2],
                ];
              } else if (col < 6) {
                square = [
                  gameBoard[6][3],
                  gameBoard[6][4],
                  gameBoard[6][5],
                  gameBoard[7][3],
                  gameBoard[7][4],
                  gameBoard[7][5],
                  gameBoard[8][3],
                  gameBoard[8][4],
                  gameBoard[8][5],
                ];
              } else {
                square = [
                  gameBoard[6][6],
                  gameBoard[6][7],
                  gameBoard[6][8],
                  gameBoard[7][6],
                  gameBoard[7][7],
                  gameBoard[7][8],
                  gameBoard[8][6],
                  gameBoard[8][7],
                  gameBoard[8][8],
                ];
              }
            }

            if (!square.find((cell) => cell.value === value)) {
              gameBoard[row][col].value = value;
              gameBoard[row][col].status = CELL_STATUS.GIVEN;

              if (checkBoard(gameBoard)) {
                return true;
              } else {
                if (fillBoard(gameBoard)) {
                  return true;
                }
              }
            }
          }
        }
      }
      break;
    }
  }
  gameBoard[row][col].value = null;
  gameBoard[row][col].status = CELL_STATUS.TO_GUESS;
  return false;
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const idx1 = Math.floor(Math.random() * array.length);
    const idx2 = Math.floor(Math.random() * array.length);

    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  }
  return array;
}

function checkBoard(gameBoard) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (!gameBoard[row][col].value) {
        return false;
      }
    }
  }
  return true;
}

function createNewGame() {
  const gameBoard = createEmptyBoard();
  fillBoard(gameBoard);

  let attempts = 100;
  counter = 1;
  while (attempts > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);

    while (!gameBoard[row][col].value) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    }

    const backup = { ...gameBoard[row][col] };

    gameBoard[row][col].value = null;
    gameBoard[row][col].status = CELL_STATUS.TO_GUESS;

    let gameBoardCopy = createEmptyBoard();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        gameBoardCopy[i][j] = { ...gameBoard[i][j] };
      }
    }

    counter = 0;
    solveBoard(gameBoardCopy);

    if (counter !== 1) {
      gameBoard[row][col] = backup;
      attempts -= 1;
    }
  }

  return gameBoard;
}

export { createNewGame };
