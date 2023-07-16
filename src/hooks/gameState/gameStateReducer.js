import { CELL_STATUS, GAME_STATUS } from "../../CONSTS";
import * as types from "./actionTypes";
import { checkBoard } from "../../gameLogic";

export default function gameStateReducer(state, action) {
  const { type } = action;
  switch (type) {
    case types.ADD_NUMBER: {
      const { rowIdx, colIdx, value } = action;
      // if given number ignore
      if (state.gameBoard[rowIdx][colIdx].status === CELL_STATUS.GIVEN)
        return state;

      // check if is the correct number
      const isCorrect =
        action.value === state.completedBoard[rowIdx][colIdx].value;

      // store backuo of cell for undo
      const backup = [
        {
          row: rowIdx,
          col: colIdx,
          cell: { ...state.gameBoard[rowIdx][colIdx] },
        },
      ];

      // if cells in the same row and col have draft numbers of the same
      // value remove them and add them to the back up
      // insert new value into the game board
      const cellHasValue = state.gameBoard[rowIdx][colIdx].value === value;
      const newGameBoard = state.gameBoard.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (colIdx === cIdx && rowIdx === rIdx) {
            return cell.value === value
              ? { ...cell, value: null, status: CELL_STATUS.TO_GUESS }
              : {
                  ...cell,
                  value: action.value,
                  draftNumbers: [],
                  status: isCorrect
                    ? CELL_STATUS.CORRECT_GUESS
                    : CELL_STATUS.WRONG_GUESS,
                };
          } else if ((colIdx === cIdx || rowIdx === rIdx) && !cellHasValue) {
            if (cell.draftNumbers.includes(value)) {
              backup.push({ row: rIdx, col: cIdx, cell: { ...cell } });
              return {
                ...cell,
                draftNumbers: cell.draftNumbers.filter((num) => num !== value),
              };
            } else return cell;
          } else return cell;
        })
      );

      // if board is complete eregister a game and set game state tot won
      const isGameWon = checkBoard(newGameBoard, state.completedBoard);
      const gameStatus = isGameWon ? GAME_STATUS.WON : state.gameStatus;
      const stats = isGameWon
        ? {
            ...state.stats,
            gamesWon: state.stats.gamesWon + 1,
            perfectGames: state.perfectGame
              ? state.stats.perfectGames + 1
              : state.stats.perfectGames,
            currentStreak: state.perfectGame
              ? state.stats.currentStreak + 1
              : 0,
            longestStreak:
              state.stats.currentStreak + 1 > state.stats.longestStreak
                ? state.stats.currentStreak + 1
                : state.stats.longestStreak,
          }
        : state.stats;

      return {
        ...state,
        moves: [...state.moves, { ...action, backup }],
        gameBoard: newGameBoard,
        perfectGame: state.perfectGame ? isCorrect : state.perfectGame,
        gameStatus,
        stats,
      };
    }
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
      const backup = [
        {
          row: rowIdx,
          col: colIdx,
          cell: { ...state.gameBoard[rowIdx][colIdx] },
        },
      ];

      // update gameboard with new value
      return {
        ...state,
        moves: [...state.moves, { ...action, backup }],
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
    }
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
      const newGameBoard = state.gameBoard.slice();
      toUndo.backup.forEach(
        (undo) => (newGameBoard[undo.row][undo.col] = { ...undo.cell })
      );

      return {
        ...state,
        moves: [...state.moves.slice(0, state.moves.length - 1)],
        gameBoard: newGameBoard,
      };

    default:
      console.log("invalid action type");
      return state;
  }
}
