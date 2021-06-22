import { useMuiTheme } from "@employer-tracker-ui/components/GlobalProviders";
import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import headerReducer from "./headerReducer";

type HeaderControls = { handleThemeSwitchClick: () => void };

export const useHeaderReducer = (reducer = headerReducer): HeaderControls => {
  const initialState = {};

  const { toggleLightDarkTheme } = useMuiTheme();
  const [{}, dispatch] = useReducerOnSteroid(reducer, initialState);
  const handleThemeSwitchClick = () => {
    toggleLightDarkTheme();
  };

  return { handleThemeSwitchClick };
};
