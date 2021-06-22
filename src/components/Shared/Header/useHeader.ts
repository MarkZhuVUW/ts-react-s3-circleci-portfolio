import { useMuiTheme } from "@employer-tracker-ui/components/GlobalProviders";
import headerReducer from "./headerReducer";

type HeaderControls = { handleThemeSwitchClick: () => void };

export const useHeader = (reducer = headerReducer): HeaderControls => {
  // const initialStates = {};

  const { toggleLightDarkTheme } = useMuiTheme();
  // const [{}, dispatch] = useReducerOnSteroid(reducer, initialStates);
  const handleThemeSwitchClick = () => {
    toggleLightDarkTheme();
  };

  return { handleThemeSwitchClick };
};
