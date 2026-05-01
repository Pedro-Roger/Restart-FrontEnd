import { createAppDependencies } from "./createAppDependencies";
import {
  AnimatedCard,
  badgeStyle,
  colors,
  logoAsset,
  radarStatusStyle,
  statusDotStyle,
  statusIcon,
  styles,
  themeModeTrack
} from "./AppRoot";

export function useRouteDependencies() {
  return createAppDependencies({
    styles,
    colors,
    logoAsset,
    AnimatedCard,
    badgeStyle,
    radarStatusStyle,
    themeModeTrack,
    statusDotStyle,
    statusIcon
  });
}
