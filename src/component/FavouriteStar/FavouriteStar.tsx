import classes from "./FavouriteStar.module.scss";

interface Props {
  isFavourite: boolean;
}

export default function FavouriteStar({ isFavourite }: Props) {
  const starEmpty = "/star_empty.svg";
  const star = "/star_full.svg";

  return <img className={classes.star} src={isFavourite ? star : starEmpty} />;
}
