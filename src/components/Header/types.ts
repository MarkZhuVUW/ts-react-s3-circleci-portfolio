import { ReactNode } from "react";

export enum HeaderActionTypes {
  Header_CLOSE = "Header_CLOSE",
  Header_TOGGLE = "Header_TOGGLE"
}
export type HeaderAction = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  payload: {};
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type HeaderState = {};

export type HeaderControls = { handleThemeSwitchClick: () => void };

export type HeaderProviderProps = {
  children?: ReactNode;
};
