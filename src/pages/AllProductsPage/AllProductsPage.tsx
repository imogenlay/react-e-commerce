import { useEffect, useState } from "react";
import Const from "../../services/const";
import type { Product } from "../../services/types";
import ProductList from "../../component/ProductList/ProductList";
import {
  deleteEntireCollection,
  forceResetEntireCollection,
} from "../../services/forceReset";
import Carousel from "../../component/Carousel/Carousel";
import {
  deleteDocumentByID,
  getAllProducts,
  purchaseCart,
} from "../../services/services";
import classes from "./AllProductsPage.module.scss";
import { useNavigate } from "react-router";

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchStatus, setFetchStatus] = useState(Const.FETCH_PENDING);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFetchStatus(Const.FETCH_LOADING);
    getAllProducts()
      .then((data: Product[]) => {
        data.sort((a: Product, b: Product) => a.order - b.order);
        console.log("All Products (" + data.length + "):", data);
        setFetchStatus(Const.FETCH_SUCCESS);
        setProducts(data);

        // Create fake carousel featured list.
        const carousel = [];
        for (let i = 0; i < Const.CHUNK_SIZE; i++) {
          carousel.push(data[i].stock[0].image);
        }

        setCarouselImages(carousel);
      })
      .catch(() => {
        setFetchStatus(Const.FETCH_FAILURE);
      });
  }, []);

  const restock = async (editCollection: () => Promise<void>) => {
    await deleteDocumentByID(Const.CART_ID);
    await editCollection();
    navigate(0);
  };

  if (fetchStatus === Const.FETCH_FAILURE)
    return (
      <main>
        <h2 className={classes.heading}>It appears the store is unstocked!</h2>
        <button
          className={classes.restock}
          onClick={() => restock(forceResetEntireCollection)}
        >
          Restock
        </button>
      </main>
    );

  if (fetchStatus !== Const.FETCH_SUCCESS) return <main />;

  const updateCarouselIndex = (index: number) => {
    setCarouselIndex(index);
  };

  const showDebugButtons = true;

  return (
    <main>
      {showDebugButtons && (
        <>
          <button
            className={classes.restock}
            onClick={() => restock(forceResetEntireCollection)}
          >
            Restock
          </button>
          <button
            className={classes.restock}
            onClick={() => restock(deleteEntireCollection)}
          >
            Delete
          </button>
        </>
      )}
      <Carousel
        updateCarouselIndex={updateCarouselIndex}
        currentIndex={carouselIndex}
        items={carouselImages}
      />
      <ProductList products={products} />
    </main>
  );
}
