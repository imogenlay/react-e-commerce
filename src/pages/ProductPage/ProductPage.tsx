import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProductById } from "../../services/services";
import Const from "../../services/const.ts";
import classes from "./ProductPage.module.scss";
import type { Product, StockItem } from "../../services/types.ts";
import StockPicker from "../../component/StockPicker/StockPicker.tsx";
import { priceFormatter } from "../../services/utils.ts";
import FavouriteStar from "../../component/FavouriteStar/FavouriteStar.tsx";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [fetchStatus, setFetchStatus] = useState(Const.FETCH_PENDING);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { id } = useParams();

  const updateVariant = (index: number) => {
    setSelectedVariant(index);
  };

  useEffect(() => {
    if (!id) {
      setFetchStatus(Const.FETCH_PENDING);
      return;
    }

    setFetchStatus(Const.FETCH_LOADING);
    getProductById(id)
      .then((p) => {
        setFetchStatus(Const.FETCH_SUCCESS);
        setProduct(p);
      })
      .catch((err) => {
        setFetchStatus(Const.FETCH_FAILURE);
        setError(err);
      });
  }, [id]);

  return (
    <main>
      {product && (
        <div className={classes.sides}>
          <div className={classes.left_side}>
            <img
              src={`${Const.IMAGE_LOCATION}${product.stock[selectedVariant].image}`}
            />
            <h1>{product.name}</h1>
            <p>{priceFormatter(product.price)}</p>
            <p>Stock remaining: {product.stock[selectedVariant].quantity}</p>
            <FavouriteStar isFavourite={product.favourite} />
          </div>
          <div className={classes.right_side}>
            {fetchStatus === Const.FETCH_SUCCESS &&
              product.stock.map((s: StockItem, i: number) => (
                <StockPicker
                  key={s.variant}
                  stock={s}
                  updateVariant={() => updateVariant(i)}
                />
              ))}
          </div>
        </div>
      )}
    </main>
  );
}
