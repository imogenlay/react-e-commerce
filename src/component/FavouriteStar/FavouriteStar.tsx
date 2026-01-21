import classes from "./FavouriteStar.module.scss";

interface Props {
  isFavourite: boolean | null;
  updateFavourite: () => void;
}

export default function FavouriteStar({ isFavourite, updateFavourite }: Props) {
  let starSrc: string = "/star_null.svg";
  if (isFavourite === true) {
    starSrc = "/star_full.svg";
  } else if (isFavourite === false) {
    starSrc = "/star_empty.svg";
  }

  return (
    <img className={classes.star} src={starSrc} onClick={updateFavourite} />
  );
}
