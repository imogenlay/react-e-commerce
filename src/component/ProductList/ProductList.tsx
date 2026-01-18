import type { Product } from "../../services/types";
import ProductCard from "../ProductCard/ProductCard";

interface PropsProductArray {
  products: Product[];
}

export default function ProductList({ products }: PropsProductArray) {
  return (
    <section>
      {products.map((p: Product) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
