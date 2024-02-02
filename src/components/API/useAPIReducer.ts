import { useReducerOnSteroid } from "@portfolio-ui/Utils";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  useCallback,
  useContext
} from "react";
import { APIAction, APIActions, APIControls, APIState } from "./types";
import { getSearchResults, GetSearchResultsResponse } from "./WebscraperAPI";
import {
  GetSearchResultsRequest,
  OnlineShopDto,
  OnlineShoppingItemDTO,
  ScrapeSearchResultsRequest
} from "./WebscraperAPI/types";
import { scrapeSearchResults } from "./WebscraperAPI/WebscraperAPI";

/**
 * The default reducer for the useAPI hook.
 * @param prevStates Previous states object.
 * @param action APIAction.
 * @returns APIState
 */
const apiReducer = (prevState: APIState, action: APIAction): APIState => {
  switch (action.type) {
    case APIActions.WebscraperAPIActions.ScrapeSearchResults:
      return handleScrapeSearchResultsAction(prevState, action);
    case APIActions.WebscraperAPIActions.SelectOnlineShop:
      return handleSelectOnlineShop(prevState, action);
    case APIActions.WebscraperAPIActions.SetLoading:
      return handleSetLoading(prevState, action);
    case APIActions.WebscraperAPIActions.ShowFavoriteItems:
      return handleShowFavoriteItems(prevState, action);
    case APIActions.WebscraperAPIActions.FavoriteItem:
      return handleFavoriteItem(prevState, action);
    default:
      throw new Error(`Unhandled API action type: ${action.type}`);
  }
};

const handleFavoriteItem = (
  prevState: APIState,
  action: APIAction
): APIState => ({
  ...prevState,
  // Replace item in searchItems with the item in payload.
  searchItems: prevState.searchItems.map((item) => {
    const tempFavoritedItem = action.payload.tempFavoritedItem;

    if (
      item.uuid === tempFavoritedItem?.uuid &&
      item.name === tempFavoritedItem.name &&
      item.onlineShopName === tempFavoritedItem.onlineShopName
    ) {
      return tempFavoritedItem;
    }
    return item;
  })
});

const handleShowFavoriteItems = (
  prevState: APIState,
  action: APIAction
): APIState => ({
  ...prevState,
  showFavoriteItems: !prevState.showFavoriteItems,
  searchItems:
    action.payload.response &&
    action.payload.response.data &&
    action.payload.response.data.data
      ? action.payload.response.data.data
      : []
});

const handleSelectOnlineShop = (
  prevState: APIState,
  action: APIAction
): APIState => ({
  ...prevState,
  selectedOnlineShop: action.payload.selectedOnlineShop
    ? action.payload.selectedOnlineShop
    : OnlineShopDto.GOOGLE_SHOPPING
});

const handleScrapeSearchResultsAction = (
  prevState: APIState,
  action: APIAction
): APIState => ({
  ...prevState,
  searchItems:
    action.payload.response &&
    action.payload.response.data &&
    action.payload.response.data.data
      ? action.payload.response.data.data
      : []
});

const handleSetLoading = (
  prevState: APIState,
  action: APIAction
): APIState => ({
  ...prevState,
  isLoading: action.payload.isLoading === true ? true : false
});

export default apiReducer;

/**
 * A hook that handles states and functions of the APIView component.
 * @param reducer Defaults to using the apiReducer but user can specify their own reducer.
 * @returns The controls of the APIView component.
 */
export const useAPIReducer = (
  initialState: APIState
): [APIControls, Dispatch<APIAction>] => {
  const handleScrapeSearchResults = (searchString: string) => {
    const scrapeSearchResultsRequest: ScrapeSearchResultsRequest = {
      params: {
        onlineShopName: selectedOnlineShop,
        searchString: searchString
      }
    };

    dispatch({
      type: APIActions.WebscraperAPIActions.SetLoading,
      payload: { isLoading: true }
    });
    scrapeSearchResults(
      scrapeSearchResultsRequest,
      (response: GetSearchResultsResponse) => {
        dispatch({
          type: APIActions.WebscraperAPIActions.ScrapeSearchResults,
          payload: {
            response: response,
            errorMsg: ""
          }
        });
        dispatch({
          type: APIActions.WebscraperAPIActions.SetLoading,
          payload: { isLoading: false }
        });
      },
      (reason: any) => {
        console.log(JSON.stringify(reason));

        dispatch({
          type: APIActions.WebscraperAPIActions.SetLoading,
          payload: {
            isLoading: false,
            errorMsg: reason["message"],
            response: {
              data: {
                data: []
              }
            }
          }
        });
      }
    );
  };

  const handleGetSearchResults = () => {
    const getSearchResultsRequest: GetSearchResultsRequest = {};

    dispatch({
      type: APIActions.WebscraperAPIActions.SetLoading,
      payload: { isLoading: true }
    });
    getSearchResults(
      getSearchResultsRequest,
      (response: GetSearchResultsResponse) => {
        dispatch({
          type: APIActions.WebscraperAPIActions.ShowFavoriteItems,
          payload: {
            response: response,
            errorMsg: ""
          }
        });
        dispatch({
          type: APIActions.WebscraperAPIActions.SetLoading,
          payload: { isLoading: false }
        });
      },
      (reason: any) => {
        console.log(JSON.stringify(reason));

        dispatch({
          type: APIActions.WebscraperAPIActions.SetLoading,
          payload: {
            isLoading: false,
            errorMsg: reason["message"],
            response: {
              data: {
                data: []
              }
            }
          }
        });
      }
    );
  };

  const handleOnlineShopChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    dispatch({
      type: APIActions.WebscraperAPIActions.SelectOnlineShop,
      payload: { selectedOnlineShop: event.target.value as OnlineShopDto }
    });
  };

  const handleFavoriteIconClick = (
    onlineShoppingItemDto: OnlineShoppingItemDTO
  ) => {
    dispatch({
      type: APIActions.WebscraperAPIActions.SelectOnlineShop,
      payload: {
        tempFavoritedItem: {
          ...onlineShoppingItemDto,
          isSaved: !onlineShoppingItemDto.isSaved
        }
      }
    });
  };
  const [apiStates, dispatch] = useReducerOnSteroid(apiReducer, initialState);
  const {
    searchItems,
    selectedOnlineShop,
    isLoading,
    errorMsg,
    showFavoriteItems
  }: APIState = apiStates;

  return [
    {
      apiStates: {
        searchItems,
        selectedOnlineShop,
        isLoading,
        errorMsg,
        showFavoriteItems
      },
      handleScrapeSearchResults,
      handleOnlineShopChange,
      handleGetSearchResults,
      handleFavoriteIconClick
    },
    dispatch
  ];
};

export const APIContext = createContext<APIControls>({
  apiStates: {
    searchItems: [],
    selectedOnlineShop: OnlineShopDto.GOOGLE_SHOPPING,
    isLoading: false,
    errorMsg: "",
    showFavoriteItems: false
  },
  handleGetSearchResults: () => {
    console.warn(`No APIContext.Provider.`);
  },
  handleOnlineShopChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    console.warn(`No APIContext.Provider. change event: ${event}`);
  },
  handleScrapeSearchResults: (searchString: string) => {
    console.warn(`No APIContext.Provider. change event: ${event}`);
  },
  handleFavoriteIconClick: (onlineShoppingItemDto: OnlineShoppingItemDTO) => {
    console.warn(
      `No APIContext.Provider. onlineShoppingItemDto: ${onlineShoppingItemDto}`
    );
  }
});

export const useAPI = (): APIControls => useContext(APIContext);
