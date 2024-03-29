import { createContext, useContext, useEffect, useReducer } from "react";
import gameStateReducer from "./gameStateReducer";
import { GAME_STATUS } from "../../CONSTS";

const initialState = {
  gameBoard: null,
  loading: true,
  gameStatus: GAME_STATUS.INITIAL,
  perfectGame: true,
  moves: [],
  settings: {
    showErrors: true,
    theme: "light",
  },
  stats: {
    gamesPlayed: 0,
    gamesWon: 0,
    perfectGames: 0,
    currentStreak: 0,
    longestStreak: 0,
  },
};

// load existing game from localstorage
let initialGameState;
try {
  initialGameState =
    JSON.parse(localStorage.getItem("sudoku_game_state")) ?? initialState;
  // if game won display won modal else display the menu
  if (initialGameState.gameStatus !== GAME_STATUS.WON)
    initialGameState.gameStatus = GAME_STATUS.INITIAL;
} catch (e) {
  console.log("unable to load state from local storage");
  initialGameState = initialState;
}

const GameStateContext = createContext(null);

function GameStateProvider({ children }) {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);

  // if gameState changed save to localStorage
  useEffect(() => {
    localStorage.setItem("sudoku_game_state", JSON.stringify(gameState));
  }, [gameState]);

  const value = { ...gameState, dispatch };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = useContext(GameStateContext);
  return context;
}

export { GameStateProvider as default, useGameState };
