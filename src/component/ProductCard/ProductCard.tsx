import Const from "../../services/const";
import type { Product } from "../../services/types";
import { priceFormatter } from "../../services/utils";
import FavouriteStar from "../FavouriteStar/FavouriteStar";
import classes from "./ProductCard.module.scss";
import { useNavigate, type NavigateFunction } from "react-router";

interface PropsProduct {
  product: Product;
}

export default function ProductCard({ product }: PropsProduct) {
  const navigate: NavigateFunction = useNavigate();

  const goToProduct = () => {
    navigate(product.id);
  };

  return (
    <article className={classes.card} onClick={goToProduct}>
      <h3 className={classes.title}>{product.name}</h3>
      <div className={classes.img_holder}>
        <img src={`${Const.IMAGE_LOCATION}${product.stock[0].image}`} />
      </div>

      <p>
        {priceFormatter(product.price)}
        <FavouriteStar isFavourite={product.favourite} />
      </p>
    </article>
  );
}
