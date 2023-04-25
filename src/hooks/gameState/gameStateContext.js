import { createContext, useContext, useEffect, useReducer } from "react";
import gameStateReducer from "./gameStateReducer";
import { createNewGame } from "../../gameLogic";
import { loadState } from "./actions";
import { GAME_STATUS } from "../../CONSTS";

const initialState = {
  gameBoard: null,
  loading: true,
  gameStatus: GAME_STATUS.INITIAL,
};

// load existing game from localstorage
let initialGameState;
try {
  initialGameState =
    JSON.parse(localStorage.getItem("sudoku_game_state")) ?? initialState;
} catch (e) {
  console.log("unable to load state from local storage");
  initialGameState = initialState;
}

const GameStateContext = createContext(null);

function GameStateProvider({ children }) {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);

  useEffect(() => {
    if (!gameState.gameBoard) {
      const gameBoard = createNewGame();
      dispatch(loadState(gameBoard));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("sudoku_game_state", JSON.stringify(gameState));
  }, [gameState]);

  return (
    <GameStateContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = useContext(GameStateContext);
  return context;
}

export { GameStateProvider as default, useGameState };
