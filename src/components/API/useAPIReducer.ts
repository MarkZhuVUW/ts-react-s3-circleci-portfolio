import { useReducerOnSteroid } from "@portfolio-ui/Utils";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  useCallback,
  useContext
} from "react";
import { APIAction, APIActionTypes, APIControls, APIState } from "./types";
import {
  getSearchResults,
  GetSearchResultsResponse,
  OnlineShopDto
} from "./WebscraperAPI";
import debounce from "lodash.debounce";
import {
  GetSearchResultsRequest,
  OnlineShoppingItemDTO,
  ScrapeSearchResultsRequest
} from "./WebscraperAPI/webscraperAPITypes";
import { scrapeSearchResults } from "./WebscraperAPI/WebscraperAPI";

/**
 * The default reducer for the useAPI hook.
 * @param prevStates Previous states object.
 * @param action APIAction.
 * @returns APIState
 */
const apiReducer = (prevState: APIState, action: APIAction): APIState => {
  switch (action.type) {
    case APIActionTypes.ScrapeSearchResults:
      return handleScrapeSearchResultsAction(prevState, action);
    case APIActionTypes.SelectOnlineShop:
      return handleSelectOnlineShop(prevState, action);
    case APIActionTypes.SetLoading:
      return handleSetLoading(prevState, action);
    case APIActionTypes.ShowFavoriteItems:
      return handleShowFavoriteItems(prevState, action);
    case APIActionTypes.FavoriteItem:
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
  const handleScrapeSearchResults = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const scrapeSearchResultsRequest: ScrapeSearchResultsRequest = {
      params: {
        onlineShopName: selectedOnlineShop,
        searchString: event.target.value as string
      }
    };
    debouncedScrapeSearchResults(scrapeSearchResultsRequest);
  };
  const debouncedScrapeSearchResults = useCallback(
    debounce((scrapeSearchResultsRequest) => {
      dispatch({
        type: APIActionTypes.SetLoading,
        payload: { isLoading: true }
      });
      scrapeSearchResults(
        scrapeSearchResultsRequest,
        (response: GetSearchResultsResponse) => {
          dispatch({
            type: APIActionTypes.ScrapeSearchResults,
            payload: {
              response: response,
              errorMsg: ""
            }
          });
          dispatch({
            type: APIActionTypes.SetLoading,
            payload: { isLoading: false }
          });
        },
        (reason: any) => {
          console.log(JSON.stringify(reason));

          dispatch({
            type: APIActionTypes.SetLoading,
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
    }, 800),
    []
  );
  const handleGetSearchResults = () => {
    const getSearchResultsRequest: GetSearchResultsRequest = {};
    debouncedGetSearchResults(getSearchResultsRequest);
  };

  const debouncedGetSearchResults = useCallback(
    debounce((getSearchResultsRequest) => {
      dispatch({
        type: APIActionTypes.SetLoading,
        payload: { isLoading: true }
      });
      getSearchResults(
        getSearchResultsRequest,
        (response: GetSearchResultsResponse) => {
          dispatch({
            type: APIActionTypes.ShowFavoriteItems,
            payload: {
              response: response,
              errorMsg: ""
            }
          });
          dispatch({
            type: APIActionTypes.SetLoading,
            payload: { isLoading: false }
          });
        },
        (reason: any) => {
          console.log(JSON.stringify(reason));

          dispatch({
            type: APIActionTypes.SetLoading,
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
    }, 800),
    []
  );

  const handleOnlineShopChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    dispatch({
      type: APIActionTypes.SelectOnlineShop,
      payload: { selectedOnlineShop: event.target.value as OnlineShopDto }
    });
  };

  const handleFavoriteIconClick = (
    onlineShoppingItemDto: OnlineShoppingItemDTO
  ) => {
    dispatch({
      type: APIActionTypes.SelectOnlineShop,
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
  handleScrapeSearchResults: (event: React.ChangeEvent<HTMLInputElement>) => {
    console.warn(`No APIContext.Provider. change event: ${event}`);
  },
  handleFavoriteIconClick: (onlineShoppingItemDto: OnlineShoppingItemDTO) => {
    console.warn(
      `No APIContext.Provider. onlineShoppingItemDto: ${onlineShoppingItemDto}`
    );
  }
});

export const useAPI = (): APIControls => useContext(APIContext);
