import {
  Box,
  CircularProgress,
  createStyles,
  Divider,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography
} from "@material-ui/core";
import React, { FC } from "react";
import { useAPI } from "../API";
import { OnlineShopDto, SearchItemCard } from "../API/WebscraperAPI";

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

  const { apiStates, handleOnlineShopChange, handleGetSearchResults } =
    useAPI();
  const { searchItems, selectedOnlineShop, isLoading, errorCode, errorMsg } =
    apiStates;

  return (
    <Box className={classes.container}>
      <Grid container alignItems="center" justify="center">
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
            helperText={`What are you looking for in ${selectedOnlineShop}?`}
            id="demo-helper-text-misaligned"
            label="Search String"
            onChange={handleGetSearchResults}
            disabled={isLoading}
          />
        </FormControl>
        {isLoading && (
          <Grid item>
            <CircularProgress color="primary" />
          </Grid>
        )}
      </Grid>
      <div style={{ marginTop: "60px" }}></div>

      <Grid
        className={classes.cardContainer}
        container
        alignItems="center"
        justify="center"
        spacing={1}
      >
        {searchItems.length === 0 && !errorCode && (
          <Typography>No item to display.</Typography>
        )}
        {Object.values(searchItems).map((searchItem) => (
          <Grid item key={`${searchItem.uuid}`} xs={12} sm={4} md={3}>
            <SearchItemCard onlineShoppingItemDto={searchItem} />
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: "30px" }}></div>
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Typography variant="h4">{errorCode}</Typography>
      </Grid>
      <Grid container alignItems="center" justify="center" spacing={1}>
        {errorMsg}
      </Grid>
    </Box>
  );
};
export default WebscraperPageView;
