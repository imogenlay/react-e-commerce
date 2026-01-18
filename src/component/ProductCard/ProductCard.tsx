import Const from "../../services/const";
import type { Product } from "../../services/types";
import classes from "./ProductCard.module.scss";
import { useNavigate } from "react-router";

interface PropsProduct {
  product: Product;
}

export default function ProductCard({ product }: PropsProduct) {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(product.id);
  };

  return (
    <article className={classes.card} onClick={goToProduct}>
      <h3>{product.name}</h3>
      <div className={classes.img_holder}>
        <img src={`${Const.IMAGE_LOCATION}${product.stock[0].image}`} />
      </div>
      <p>{`$${product.price.toFixed(2)}`}</p>
      <p>{"Fav: " + product.favourite}</p>
    </article>
  );
}
