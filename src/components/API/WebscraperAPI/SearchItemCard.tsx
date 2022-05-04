import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  IconButton,
  Link,
  makeStyles,
  Typography
} from "@material-ui/core";

import React, { FC } from "react";
import { OnlineShoppingItemDTO } from "./webscraperAPITypes";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

type SearchItemCardProps = {
  onlineShoppingItemDto: OnlineShoppingItemDTO;
};

const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      flex: 1,
      width: "undefined",
      height: "undefined",
      resizeMode: "contain"
    }
  })
);

const SearchItemCard: FC<SearchItemCardProps> = ({
  onlineShoppingItemDto
}: SearchItemCardProps) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="subtitle1">
            {onlineShoppingItemDto.name}
          </Typography>
        }
        subheader={
          <Link
            href={onlineShoppingItemDto.href}
            underline="always"
            target="_blank"
            rel="noreferrer"
          >
            {onlineShoppingItemDto.onlineShopName}
          </Link>
        }
      />
      <CardMedia
        component="img"
        image={onlineShoppingItemDto.imageUrl}
        className={classes.cover}
      />

      <CardContent>
        <Typography variant="body2">
          Price: {onlineShoppingItemDto.salePrice}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {!onlineShoppingItemDto.isSaved && <FavoriteOutlinedIcon />}
          {onlineShoppingItemDto.isSaved && <FavoriteIcon color="secondary" />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SearchItemCard;
