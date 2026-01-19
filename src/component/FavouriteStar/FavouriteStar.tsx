interface Props {
  isFavourite: boolean;
}

export default function FavouriteStar({ isFavourite }: Props) {
  const starEmpty = "./src/assets/favourite_star.png";
  const star = "./src/assets/favourite_star.png";

  return <img src={isFavourite ? star : starEmpty} />;
}
