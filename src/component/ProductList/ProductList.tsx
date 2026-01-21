import Const from "../../services/const";
import type { Product } from "../../services/types";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductList.module.scss";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  // Split products into chunks of 6.
  const chunks = [];
  for (let i = 0; i < products.length / Const.CHUNK_SIZE; i++) {
    chunks.push(
      products.slice(i * Const.CHUNK_SIZE, (i + 1) * Const.CHUNK_SIZE),
    );
  }

  const headings = [
    "FEATURED",
    "THE JOEY COLLECTION",
    "NEW ON THE RACK",
    "FINAL MATCHUP FROM SPARK",
    "SELLING FAST",
    "SELLING FASTER",
  ];

  return (
    <section className={classes.list}>
      {chunks.map((chunk: Product[], i: number) => {
        return (
          <>
            <h2 key={headings[i]} className={classes.subheading}>
              {headings[i]}
            </h2>
            {chunk.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </>
        );
      })}
    </section>
  );
}
