import {
  HEADER_HEIGHT,
  BASE_PLAY_FIELD_HEIGHT,
  BASE_GAME_BOARD_DIAMETER,
} from "../CONSTS";
import useWindowDimensions from "./useWindowDimensions";

function useScaleFactor() {
  const { windowDimentions } = useWindowDimensions();

  // set the scale base on window dimensions
  const scaleFactor = Math.min(
    (windowDimentions.height - HEADER_HEIGHT) / BASE_PLAY_FIELD_HEIGHT,
    windowDimentions.width / (BASE_GAME_BOARD_DIAMETER + 20),
    1
  );

  return scaleFactor;
}

export default useScaleFactor;
