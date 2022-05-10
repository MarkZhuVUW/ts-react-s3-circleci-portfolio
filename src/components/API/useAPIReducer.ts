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
  GetSearchResultsRequest,
  GetSearchResultsResponse,
  OnlineShopDto,
  OnlineShoppingItemDTO
} from "./WebscraperAPI";
import debounce from "lodash.debounce";

/**
 * The default reducer for the useAPI hook.
 * @param prevStates Previous states object.
 * @param action APIAction.
 * @returns APIState
 */
const apiReducer = (prevState: APIState, action: APIAction): APIState => {
  switch (action.type) {
    case APIActionTypes.GetSearchResults:
      return handleGetSearchResultsAction(prevState, action);
    case APIActionTypes.SelectOnlineShop:
      return handleSelectOnlineShop(prevState, action);
    case APIActionTypes.SetLoading:
      return handleSetLoading(prevState, action);
    default:
      throw new Error(`Unhandled API action type: ${action.type}`);
  }
};

const handleSelectOnlineShop = (
  prevState: APIState,
  action: APIAction
): APIState => {
  return {
    ...prevState,
    ...action.payload,
    selectedOnlineShop: action.payload.selectedOnlineShop
      ? action.payload.selectedOnlineShop
      : OnlineShopDto.COUNTDOWN
  };
};

const handleGetSearchResultsAction = (
  prevState: APIState,
  action: APIAction
): APIState => ({
  ...prevState,
  ...action.payload,
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
  ...action.payload,
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
  const handleGetSearchResults = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const getSearchResultsRequest: GetSearchResultsRequest = {
      params: {
        onlineShopName: selectedOnlineShop,
        searchString: event.target.value as string
      }
    };
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
            type: APIActionTypes.GetSearchResults,
            payload: { response: response, errorCode: "", errorMsg: "" }
          });
          dispatch({
            type: APIActionTypes.SetLoading,
            payload: { isLoading: false }
          });
        },
        (reason: any) => {
          console.log(JSON.stringify(reason));

          const data: OnlineShoppingItemDTO[] = [];
          dispatch({
            type: APIActionTypes.SetLoading,
            payload: {
              isLoading: false,
              errorCode: "500",
              errorMsg: reason["message"],
              response: {
                data: {
                  data
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

  const [apiStates, dispatch] = useReducerOnSteroid(apiReducer, initialState);
  const {
    searchItems,
    selectedOnlineShop,
    isLoading,
    errorCode,
    errorMsg
  }: APIState = apiStates;

  return [
    {
      apiStates: {
        searchItems,
        selectedOnlineShop,
        isLoading,
        errorCode,
        errorMsg
      },
      handleGetSearchResults,
      handleOnlineShopChange
    },
    dispatch
  ];
};

export const APIContext = createContext<APIControls>({
  apiStates: {
    searchItems: [],
    selectedOnlineShop: OnlineShopDto.COUNTDOWN,
    isLoading: false,
    errorCode: "",
    errorMsg: ""
  },
  handleGetSearchResults: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    console.warn(`No APIContext.Provider. textfield change event: ${event}`);
  },
  handleOnlineShopChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    console.warn(`No APIContext.Provider. change event: ${event}`);
  }
});

export const useAPI = (): APIControls => useContext(APIContext);
