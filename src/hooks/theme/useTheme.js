import { themes } from "../../CONSTS";
import { useGameState } from "../gameState/gameStateContext";

function useTheme() {
  const { settings } = useGameState();

  return {
    currentTheme: settings.theme,
    availableThemes: themes,
  };
}

export default useTheme;
