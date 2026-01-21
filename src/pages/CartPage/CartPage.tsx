import { useEffect, useState } from "react";
import {
  type Cart,
  type CartElement,
  type CartItem,
} from "../../services/types";
import {
  addItemToCart,
  createPlaceHolderCart,
  createProductStockID,
  getProductById,
  purchaseCart,
  readProductStockID,
  subscribeToCart,
} from "../../services/services";
import classes from "./CartPage.module.scss";
import { CartList } from "../../component/CartList/CartList";
import { priceFormatter } from "../../services/utils";

export default function CartPage() {
  const [cart, setCart] = useState<Cart>(createPlaceHolderCart());
  const [cartElements, setCartElements] = useState<CartElement[]>([]);

  const heading = "Your Cart" + (cartElements.length === 0 ? " is Empty" : "");

  useEffect(() => {
    // Subscribe to the cart!
    const unsub = subscribeToCart(setCart);
    return unsub;
  }, []);

  useEffect(() => {
    // This will trigger every time the cart is updated.
    // Which is often thanks to subscription.
    if (cart.cartItems.length === 0) {
      setCartElements([]);
      return;
    }

    const buildCartElements = async () => {
      const elements = await Promise.all(
        cart.cartItems.map(async (ci: CartItem) => {
          // Turn the cart into useful data, called a CartElement
          const itemIDs = readProductStockID(ci);
          const productData = await getProductById(itemIDs.productID);
          const stockItem = productData.stock[itemIDs.stockIndex];

          return {
            id: itemIDs.productID,
            stockIndex: itemIDs.stockIndex,
            name: productData.name,
            price: ci.price,
            count: ci.count,
            image: stockItem.image,
            variant: stockItem.variant,
          };
        }),
      );

      setCartElements(elements);
    };

    buildCartElements();
  }, [cart]);

  const createCartItemFromElement = (
    cartElement: CartElement,
    offset: number,
  ): CartItem => {
    return {
      productStockID: createProductStockID(
        cartElement.id,
        cartElement.stockIndex,
      ),
      count: offset,
      price: cartElement.price,
    };
  };

  const modifyItem = (cartElement: CartElement, offset: number) => {
    addItemToCart(createCartItemFromElement(cartElement, offset));
  };

  const totalPrice = () =>
    priceFormatter(
      cartElements.reduce(
        (prev, element) => prev + element.price * element.count,
        0,
      ),
    );

  return (
    <main>
      <h1 className={classes.title}>{heading}</h1>
      <div className={classes.all_elements}>
        <CartList cartElements={cartElements} modifyItem={modifyItem} />
      </div>
      {cartElements.length > 0 && (
        <>
          <p className={classes.price}>Total: {totalPrice()}</p>
          <button className={classes.buy_button} onClick={purchaseCart}>
            Checkout
          </button>
        </>
      )}
    </main>
  );
}
