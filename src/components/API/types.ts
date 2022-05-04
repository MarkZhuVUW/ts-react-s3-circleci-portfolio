import { ChangeEvent, ReactNode } from "react";
import {
  OnlineShopDto,
  WebscraperAPIActions,
  OnlineShoppingItemDTO,
  GetSearchResultsResponse
} from "./WebscraperAPI";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export const APIActionTypes = {
  ...WebscraperAPIActions
};

export type APIAction = {
  type: string;
  payload: {
    response?: GetSearchResultsResponse;
    selectedOnlineShop?: OnlineShopDto;
    isLoading?: boolean;
    errorCode?: string;
    errorMsg?: string;
  };
};
export type APIState = {
  searchItems: Array<OnlineShoppingItemDTO>;
  selectedOnlineShop: OnlineShopDto;
  isLoading: boolean;
  errorCode: string;
  errorMsg: string;
};

export type APIControls = {
  apiStates: APIState;
  handleGetSearchResults: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  handleOnlineShopChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
};

export type APIProviderProps = {
  children?: ReactNode;
};
