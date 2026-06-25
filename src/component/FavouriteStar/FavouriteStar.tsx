import { useState } from "react";
import classes from "./FavouriteStar.module.scss";
import Const from "../../services/const";

interface Props {
  isFavourite: boolean;
  isEnabled: boolean;
  updateFavourite: () => void;
}

export default function FavouriteStar({
  isFavourite,
  isEnabled,
  updateFavourite,
}: Props) {
  const [spinner, setSpinner] = useState(false);

  let starSrc = Const.IMAGE_LOCATION + "star_empty.svg";
  if (isFavourite) {
    starSrc = Const.IMAGE_LOCATION + "star_full.svg";
  }

  const updateStar = () => {
    setSpinner(!isFavourite);
    updateFavourite();
  };

  let starClass: string = classes.star;
  if (isEnabled) {
    starClass += " " + classes.enabled;
    if (spinner) starClass += " " + classes.spinner;
  }

  return <img className={starClass} src={starSrc} onClick={updateStar} />;
}
