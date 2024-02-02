import { ChangeEvent, ReactNode } from "react";
import {
  GetSearchResultsResponse,
  OnlineShoppingItemDTO
} from "./WebscraperAPI";

import { OnlineShopDto, WebscraperAPIActions } from "./WebscraperAPI/types";
export const APIActions = {
  WebscraperAPIActions: { ...WebscraperAPIActions }
};

export type APIAction = {
  type: string;
  payload: {
    response?: GetSearchResultsResponse;
    selectedOnlineShop?: OnlineShopDto;
    isLoading?: boolean;
    errorMsg?: string;
    showFavoriteItems?: boolean;
    tempFavoritedItem?: OnlineShoppingItemDTO;
  };
};
export type APIState = {
  searchItems: Array<OnlineShoppingItemDTO>;
  selectedOnlineShop: OnlineShopDto;
  isLoading: boolean;
  errorMsg: string;
  showFavoriteItems: boolean;
};

export type APIControls = {
  apiStates: APIState;
  handleGetSearchResults: () => void;
  handleOnlineShopChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  handleScrapeSearchResults: (searchString: string) => void;
  handleFavoriteIconClick: (
    onlineShoppingItemDTO: OnlineShoppingItemDTO
  ) => void;
};

export type APIProviderProps = {
  children?: ReactNode;
};
