import { useEffect, useState } from "react";
import Const from "../../services/const";
import type { Product } from "../../services/types";
import ProductList from "../../component/ProductList/ProductList";
import Carousel from "../../component/Carousel/Carousel";
import { getAllProducts } from "../../services/services";
import classes from "./AllProductsPage.module.scss";

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchStatus, setFetchStatus] = useState(Const.FETCH_PENDING);
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
      .catch(() => {
        setFetchStatus(Const.FETCH_FAILURE);
      });
  }, []);

  if (fetchStatus === Const.FETCH_FAILURE)
    return (
      <main>
        <h2 className={classes.heading}>It appears the store is unstocked!</h2>
      </main>
    );

  if (fetchStatus !== Const.FETCH_SUCCESS) return <main />;

  const updateCarouselIndex = (index: number) => {
    setCarouselIndex(index);
  };

  return (
    <main>
      <Carousel
        updateCarouselIndex={updateCarouselIndex}
        currentIndex={carouselIndex}
        items={carouselImages}
      />
      <ProductList products={products} />
    </main>
  );
}
