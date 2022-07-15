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
  handleScrapeSearchResults: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleFavoriteIconClick: (
    onlineShoppingItemDTO: OnlineShoppingItemDTO
  ) => void;
};

export type APIProviderProps = {
  children?: ReactNode;
};
