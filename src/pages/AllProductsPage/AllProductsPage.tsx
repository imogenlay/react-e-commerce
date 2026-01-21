import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/services";
import Const from "../../services/const";
import type { Product } from "../../services/types";
import ProductList from "../../component/ProductList/ProductList";
import { forceResetEntireCollection } from "../../services/forceReset";
import classes from "./AllProductsPage.module.scss";
import Carousel from "../../component/Carousel/Carousel";

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchStatus, setFetchStatus] = useState(Const.FETCH_PENDING);
  const [error, setError] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

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
      .catch((e) => {
        setError(e);
        setFetchStatus(Const.FETCH_FAILURE);
      });
  }, []);

  if (fetchStatus !== Const.FETCH_SUCCESS)
    return (
      <main>
        <button onClick={forceResetEntireCollection}>Reset</button>
      </main>
    );

  const updateCarouselIndex = (index: number) => {
    setCarouselIndex(index);
  };

  return (
    <main>
      <button onClick={forceResetEntireCollection}>Reset</button>

      <Carousel
        updateCarouselIndex={updateCarouselIndex}
        currentIndex={carouselIndex}
        items={carouselImages}
      />
      <ProductList products={products} />
    </main>
  );
}
