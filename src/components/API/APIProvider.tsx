import React from "react";
import { FC } from "react";
import { useAPIReducer, APIContext } from "./useAPIReducer";
import { APIProviderProps, APIState } from "./types";
import { OnlineShopDto } from "./WebscraperAPI";

const APIProvider: FC<APIProviderProps> = ({ children }: APIProviderProps) => {
  const initialState: APIState = {
    searchItems: [],
    selectedOnlineShop: OnlineShopDto.COUNTDOWN,
    isLoading: false,
    errorCode: "",
    errorMsg: ""
  };

  return (
    <APIContext.Provider value={{ ...useAPIReducer(initialState)[0] }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
