import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/services";
import Const from "../../services/const";
import type { Product } from "../../services/types";
import ProductList from "../../component/ProductList/ProductList";
import { forceResetEntireCollection } from "../../services/forceReset";
import classes from "./AllProductsPage.module.scss";

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
      <button onClick={forceResetEntireCollection}>Reset</button>
      <h1 className={classes.heading}>Glasses Co.</h1>
      {fetchStatus === Const.FETCH_SUCCESS && (
        <ProductList products={products} />
      )}
    </main>
  );
}
