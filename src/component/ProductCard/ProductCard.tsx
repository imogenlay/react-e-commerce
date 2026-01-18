import type { Product } from "../../services/types";
import classes from "./ProductCard.module.scss";
import { Link } from "react-router";

interface PropsProduct {
  product: Product;
}

export default function ProductCard({ product }: PropsProduct) {
  return (
    <article
      className={classes.a}
      style={{ backgroundImage: `url(./assets/${product.stock[0].image})` }}
    >
      <div className={classes.content}>
        <p>{product.name}</p>
        <Link to={product.id}>See More</Link>
      </div>
    </article>
  );
}
