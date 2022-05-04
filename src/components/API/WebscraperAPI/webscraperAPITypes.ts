export type GetSearchResultsResponse = {
  data: {
    data: Array<OnlineShoppingItemDTO>;
  };
};
export type GetSearchResultsRequest = {
  params: GetSearchResultsParams;
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

export type GetSearchResultsParams = {
  onlineShopName: OnlineShopDto;
  searchString: string;
};

export enum WebscraperAPIActions {
  GetSearchResults = "GetSearchResults",
  SelectOnlineShop = "SelectOnlineShop",
  SetLoading = "SetLoading",
  SetAPIFired = "SetAPIFired"
}
