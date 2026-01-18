import type { Product } from "../../services/types";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductList.module.scss";

interface PropsProductArray {
  products: Product[];
}

export default function ProductList({ products }: PropsProductArray) {
  return (
    <section className={classes.list}>
      {products
        .sort((a: Product, b: Product) => a.order - b.order)
        .map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
    </section>
  );
}
