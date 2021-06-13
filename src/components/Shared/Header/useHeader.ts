import { useMuiTheme } from "@employer-tracker-ui/components/GlobalProviders";
import { useReducer } from "react";
import headerReducer, { HeaderActionTypes } from "./headerReducer";

type HeaderControls = { handleThemeSwitchClick: () => void };

const useHeader = (): HeaderControls => {
  const { toggleLightDarkTheme } = useMuiTheme();
  const [{}, dispatch] = useReducer(headerReducer, {});
  const handleThemeSwitchClick = () => {
    dispatch({
      type: HeaderActionTypes.HEADER_SWITCH_CLICK,
      payload: { toggleLightDarkTheme }
    });
  };

  return { handleThemeSwitchClick };
};
export default useHeader;
