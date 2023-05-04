import { themes } from "../../CONSTS";
import { useGameState } from "../gameState/gameStateContext";

function useTheme() {
  const { gameState } = useGameState();

  return {
    currentTheme: themes[gameState.settings.theme],
    availableThemes: Object.keys(themes),
    currentThemeName: gameState.settings.theme,
  };
}

export default useTheme;
