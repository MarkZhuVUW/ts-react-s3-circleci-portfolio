export type GetSearchResultsResponse = {
  data: {
    data: Array<OnlineShoppingItemDTO>;
  };
};

export type GetSearchResultsRequest = Record<string, never>;

export type ScrapeSearchResultsRequest = {
  params: ScrapeSearchResultsParams;
};

export type OnlineShoppingItemDTO = {
  OnlineShopDto: OnlineShopDto;
  onlineShopName: string;
  salePrice: string;
  name: string;
  isSaved: boolean;
  imageUrl: string;
  href: string;
  uuid: string;
};

export enum OnlineShopDto {
  COUNTDOWN = "COUNTDOWN",
  PET_CO = "PET_CO",
  THE_WAREHOUSE = "THE_WAREHOUSE",
  GOOGLE_SHOPPING = "GOOGLE_SHOPPING"
}

export type ScrapeSearchResultsParams = {
  onlineShopName: OnlineShopDto;
  searchString: string;
};

export enum WebscraperAPIActions {
  ScrapeSearchResults = "ScrapeSearchResults",
  SelectOnlineShop = "SelectOnlineShop",
  SetLoading = "SetLoading",
  SetAPIFired = "SetAPIFired",
  ShowFavoriteItems = "ShowFavoriteItems",
  FavoriteItem = "FavoriteItem"
}
