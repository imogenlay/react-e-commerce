import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  addItemToCart,
  createProductStockID,
  getProductById,
  updateProductById,
} from "../../services/services";
import Const from "../../services/const.ts";
import classes from "./ProductPage.module.scss";
import type { CartItem, Product, StockItem } from "../../services/types.ts";
import StockPicker from "../../component/StockPicker/StockPicker.tsx";
import { priceFormatter } from "../../services/utils.ts";
import FavouriteStar from "../../component/FavouriteStar/FavouriteStar.tsx";
import Carousel from "../../component/Carousel/Carousel.tsx";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [fetchStatus, setFetchStatus] = useState(Const.FETCH_PENDING);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [maxStockReached, setMaxStockReached] = useState(false);
  const { id } = useParams();

  const addItem = async () => {
    if (product === null) return;

    const productStockID = createProductStockID(product, selectedVariant);
    const cartItem: CartItem = {
      productStockID,
      count: 1,
      price: product.price,
    };

    const cartCountReport = await addItemToCart(cartItem);
    console.log(cartCountReport);
    setMaxStockReached(cartCountReport.current >= cartCountReport.maximum);
  };

  const updateVariant = (index: number) => {
    setMaxStockReached(false);
    setSelectedVariant(index);
  };

  const updateFavourite = () => {
    if (product === null) return;

    const newProduct: Product = { ...product, favourite: !product?.favourite };
    updateProductById(newProduct);
    setProduct(newProduct);
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

  if (error) return <main>{error}</main>;

  if (!product || fetchStatus !== Const.FETCH_SUCCESS) return <main />;

  const variantNames: string[] = product.stock.map((s) => s.image);

  const getStockText = () => {
    const currentStockQuantity = product.stock[selectedVariant].quantity;
    if (currentStockQuantity < 1) return "Out of Stock";
    if (currentStockQuantity < 2) return "Only 1 remaining";
    return currentStockQuantity + " stock remaining";
  };

  return (
    <main>
      <Carousel
        updateCarouselIndex={updateVariant}
        currentIndex={selectedVariant}
        items={variantNames}
      />
      <div className={classes.sides}>
        <div className={classes.information}>
          <hgroup className={classes.header_group}>
            <h1 className={classes.title}>{product.name}</h1>
            <h1 className={classes.stock_title}>
              {product.stock[selectedVariant].variant}
            </h1>
            <hr />
            <div className={classes.button_group}>
              <FavouriteStar
                isFavourite={product.favourite}
                isEnabled={true}
                updateFavourite={updateFavourite}
              />
              <button className={classes.add_button} onClick={addItem}>
                Add to cart
              </button>
              {maxStockReached && (
                <p className={classes.stock_remaining}>
                  All stock are in cart.
                </p>
              )}
            </div>
          </hgroup>
          <div className={classes.price_group}>
            <p className={classes.price}>{priceFormatter(product.price)}</p>
            <p className={classes.stock_remaining}>{getStockText()}</p>
          </div>
        </div>

        <div className={classes.stocks}>
          {product.stock.map((s: StockItem, i: number) => (
            <StockPicker
              key={s.variant}
              stock={s}
              updateVariant={() => updateVariant(i)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
