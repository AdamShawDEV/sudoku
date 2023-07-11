import { themes } from "../../CONSTS";
import { useGameState } from "../gameState/gameStateContext";

function useTheme() {
  const { gameState } = useGameState();

  return {
    currentTheme: gameState.settings.theme,
    availableThemes: themes,
  };
}

export default useTheme;
