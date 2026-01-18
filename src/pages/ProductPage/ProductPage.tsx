import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProductById } from "../../services/services";
import Const from "../../services/const.ts";
import type { Product, StockItem } from "../../services/types.ts";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [fetchStatus, setFetchStatus] = useState(Const.FETCH_PENDING);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
      <h1>{product?.name}</h1>
      {fetchStatus === Const.FETCH_SUCCESS && (
        <>
          {product?.stock.map((s: StockItem) => {
            return (
              <>
                <div>
                  <img src={`${Const.IMAGE_LOCATION}${s.image}`} />
                  <p>{s.variant}</p>
                  <p>In stock {s.quantity}</p>
                </div>
              </>
            );
          })}
          <p>{`$${product?.price.toFixed(2)}`}</p>
          <p>{"Fav: " + product?.favourite}</p>
        </>
      )}
    </main>
  );
}
