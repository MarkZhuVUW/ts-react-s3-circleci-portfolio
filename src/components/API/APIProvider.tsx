import React, { FC } from "react";
import { OnlineShopDto } from "./WebscraperAPI/types";
import { APIProviderProps, APIState } from "./types";
import { APIContext, useAPIReducer } from "./useAPIReducer";

const APIProvider: FC<APIProviderProps> = ({ children }: APIProviderProps) => {
  const initialState: APIState = {
    searchItems: [],
    selectedOnlineShop: OnlineShopDto.GOOGLE_SHOPPING,
    isLoading: false,
    errorMsg: "",
    showFavoriteItems: false
  };

  return (
    <APIContext.Provider value={{ ...useAPIReducer(initialState)[0] }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
