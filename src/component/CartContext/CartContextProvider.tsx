import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import type { Cart, CartItem } from "../../services/types";
import { getCartDocument, updateCartDocument } from "../../services/services";

interface CartContextType {
  cart: Cart | null;
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (cartItem: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  // Custom hook to get cart object.
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  const updateCart = (updatedCart: Cart) => {
    updatedCart.cartItems = updatedCart.cartItems.filter(
      (cartItem: CartItem) => cartItem.count > 0,
    );

    // Update cart data.
    setCart(updatedCart);
    updateCartDocument(updatedCart);
  };

  const addToCart = (cartItem: CartItem) => {
    if (cart === null) return;
    const updatedCart = { ...cart };
    let wasInCart = false;
    console.log(updatedCart);

    for (let i = 0; i < updatedCart.cartItems.length; i++)
      if (updatedCart.cartItems[i].productStockID === cartItem.productStockID) {
        updatedCart.cartItems[i].count += cartItem.count;
        wasInCart = true;
        break;
      }

    // Item was not in cart...
    if (!wasInCart) updatedCart.cartItems.push(cartItem);
    updateCart(updatedCart);
  };

  const removeFromCart = (cartItem: CartItem) => {
    if (cart === null) return;
    const updatedCart = { ...cart };

    for (let i = 0; i < updatedCart.cartItems.length; i++)
      if (updatedCart.cartItems[i].productStockID === cartItem.productStockID)
        updatedCart.cartItems[i].count -= cartItem.count;

    updateCart(updatedCart);
  };

  useEffect(() => {
    getCartDocument().then((cart) => setCart(cart));
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
