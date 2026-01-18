import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/services";
import Const from "../../services/const";
import type { Product } from "../../services/types";
import ProductCard from "../../component/ProductCard/ProductCard";
import ProductList from "../../component/ProductList/ProductList";

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchStatus, setFetchStatus] = useState(Const.FETCH_PENDING);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFetchStatus(Const.FETCH_LOADING);
    getAllProducts()
      .then((data: Product[]) => {
        console.log("All Products (" + data.length + "):", data);
        setFetchStatus(Const.FETCH_SUCCESS);
        setProducts(data);
      })
      .catch((e) => {
        setError(e);
        setFetchStatus(Const.FETCH_FAILURE);
      });
  }, []);

  return (
    <main>
      <h1>Products Page</h1>

      {fetchStatus === Const.FETCH_SUCCESS && (
        <ProductList products={products} />
      )}
    </main>
  );
}
