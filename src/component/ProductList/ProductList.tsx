import type { Product } from "../../services/types";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductList.module.scss";

interface PropsProductArray {
  products: Product[];
}

export default function ProductList({ products }: PropsProductArray) {
  const sortedProducts = products
    .sort((a: Product, b: Product) => a.order - b.order)
    .map((p: Product) => <ProductCard key={p.id} product={p} />);

  const hasTwoSections: boolean = sortedProducts.length >= 6;
  if (!hasTwoSections)
    return <section className={classes.list}>{sortedProducts}</section>;

  const SPLIT_INDEX = 6;
  const splitArray = [
    sortedProducts.slice(0, SPLIT_INDEX),

    sortedProducts.slice(SPLIT_INDEX),
  ];
  return (
    <section className={classes.list}>
      <h2 className={classes.subheading}>THE JOEY COLLECTION</h2>
      {splitArray[0]}
      <h2 className={classes.subheading}>NEW ON THE RACK</h2>
      {splitArray[1]}
    </section>
  );
}
