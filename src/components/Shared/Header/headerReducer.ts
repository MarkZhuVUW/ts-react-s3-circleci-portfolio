export enum HeaderActionTypes {
  HEADER_SWITCH_CLICK = "HEADER_SWITCH_CLICK"
}

type HeaderAction = {
  type: string;
  payload?: { toggleLightDarkTheme: () => void };
};
type HeaderState = Record<string, never>;
/**
 * The default reducer for the useHeader hook.
 * @param prevStates Previous MenuState.
 * @param action MenuAction.
 * @returns MenuState
 */
const headerReducer = (
  prevStates: HeaderState,
  action: HeaderAction
): HeaderState => {
  switch (action.type) {
    case HeaderActionTypes.HEADER_SWITCH_CLICK:
      action.payload?.toggleLightDarkTheme();
      return {};
    default:
      throw new Error(`Unhandled header action type: ${action.type}`);
  }
};

export default headerReducer;
