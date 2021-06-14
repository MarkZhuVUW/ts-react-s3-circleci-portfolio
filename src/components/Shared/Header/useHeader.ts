import { useMuiTheme } from "@employer-tracker-ui/components/GlobalProviders";
import { useReducer } from "react";
import headerReducer, { HeaderActionTypes } from "./headerReducer";

type HeaderControls = { handleThemeSwitchClick: () => void };

export const useHeader = (reducer = headerReducer): HeaderControls => {
  const { toggleLightDarkTheme } = useMuiTheme();
  const [{}, dispatch] = useReducer(reducer, {});
  const handleThemeSwitchClick = () => {
    dispatch({
      type: HeaderActionTypes.HEADER_SWITCH_CLICK,
      payload: { toggleLightDarkTheme }
    });
  };

  return { handleThemeSwitchClick };
};
