import { useMuiTheme } from "@employer-tracker-ui/components/GlobalProviders";
import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { Reducer } from "react";
import headerReducer, {
  HeaderAction,
  HeaderActionTypes,
  HeaderState
} from "./headerReducer";

type HeaderControls = { handleThemeSwitchClick: () => void };

export const useHeader = (
  reducer: Reducer<HeaderState, HeaderAction> = headerReducer
): HeaderControls => {
  const initialStates = {};

  const { toggleLightDarkTheme } = useMuiTheme();
  const [{}, dispatch] = useReducerOnSteroid(reducer, initialStates);
  const handleThemeSwitchClick = () => {
    dispatch({
      type: HeaderActionTypes.HEADER_SWITCH_CLICK,
      payload: { toggleLightDarkTheme }
    });
  };

  return { handleThemeSwitchClick };
};
