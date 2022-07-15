import axios from "axios";
import APIUrl from "../APIUrl";
import {
  ScrapeSearchResultsRequest,
  GetSearchResultsRequest,
  GetSearchResultsResponse
} from "./webscraperAPITypes";

const webscraperAPIAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:80/webscraper-api"
      : APIUrl.WEBSCRAPER_API,

  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": `${APIUrl.WEBSCRAPER_FRONTEND},http://localhost:4000`
  }
});

export const getSearchResults = (
  request: GetSearchResultsRequest,
  thenCb: (response: GetSearchResultsResponse) => void,
  catchCb: (reason: string) => void
): void => {
  webscraperAPIAxios
    .get("/search/items", { params: request.params })
    .then(thenCb)
    .catch(catchCb);
};

export const scrapeSearchResults = (
  request: ScrapeSearchResultsRequest,
  thenCb: (response: GetSearchResultsResponse) => void,
  catchCb: (reason: string) => void
): void => {
  webscraperAPIAxios
    .get("/scrape/items", { params: request.params })
    .then(thenCb)
    .catch(catchCb);
};
