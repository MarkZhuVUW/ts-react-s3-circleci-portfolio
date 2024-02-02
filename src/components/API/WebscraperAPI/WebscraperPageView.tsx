import {
  Box,
  Checkbox,
  CircularProgress,
  createStyles,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography
} from "@material-ui/core";
import React, { FC, useState } from "react";
import { OnlineShopDto } from "./types";
import { useAPI } from "../useAPIReducer";
import SearchItemCard from "./SearchItemCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: "100%"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    cardContainer: {
      flexGrow: 1
    },
    container: {
      flexGrow: 1,
      height: "100%"
    }
  })
);

const WebscraperPageView: FC = () => {
  const classes = useStyles();

  const {
    apiStates,
    handleOnlineShopChange,
    handleGetSearchResults,
    handleScrapeSearchResults
  } = useAPI();

  const [searchString, setSearchString] = useState("");
  const {
    searchItems,
    selectedOnlineShop,
    isLoading,
    errorMsg,
    showFavoriteItems
  } = apiStates;

  return (
    <Box className={classes.container}>
      <Grid container alignItems="center" justifyContent="center">
        <FormControl className={classes.formControl}>
          <Select
            labelId="online-shop-dto-select"
            id="online-shop-dto-select"
            value={selectedOnlineShop}
            label="Online shop select"
            onChange={handleOnlineShopChange}
          >
            {Object.values(OnlineShopDto).map((onlineShopDto) => (
              // Online shops are unique, save to use as key.
              <MenuItem key={onlineShopDto} value={onlineShopDto}>
                {onlineShopDto}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            helperText={
              selectedOnlineShop === OnlineShopDto.GOOGLE_SHOPPING
                ? "You are getting Google search results in Northcote, Auckland"
                : `What are you looking for in ${selectedOnlineShop}?`
            }
            id="demo-helper-text-misaligned"
            label="Search String"
            placeholder={"click enter to search."}
            onChange={(e) => setSearchString(e.target.value)}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                handleScrapeSearchResults(searchString);
              }
            }}
            disabled={isLoading}
          />
        </FormControl>
        {isLoading && (
          <Grid item>
            <CircularProgress color="primary" />
          </Grid>
        )}
        <FormControlLabel
          className={classes.formControl}
          control={
            <Checkbox
              checked={showFavoriteItems}
              onChange={handleGetSearchResults}
              name="showFavoriteItems"
              color="primary"
            />
          }
          label="Show favourite items"
        />
      </Grid>
      <div style={{ marginTop: "60px" }}></div>

      <Grid
        className={classes.cardContainer}
        container
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        {searchItems.length === 0 && (
          <Typography>No item to display.</Typography>
        )}
        {Object.values(searchItems).map((searchItem) => (
          <Grid item key={`${searchItem.uuid}`} xs={12} sm={4} md={3}>
            <SearchItemCard onlineShoppingItemDto={searchItem} />
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: "30px" }}></div>
      <Grid container alignItems="center" justifyContent="center" spacing={1}>
        {errorMsg}
      </Grid>
    </Box>
  );
};
export default WebscraperPageView;
