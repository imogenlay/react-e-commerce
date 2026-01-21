import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../config/firestore.ts";
import type { Cart, CartItem, Product } from "./types.ts";
import Const from "./const.ts";

const getAllOfDocumentType = async (documentType: string) => {
  const collectionRef = collection(database, Const.COLLECTION_NAME);
  const snapshot = await getDocs(collectionRef);

  const documents = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter(
      (a: any) => documentType == "any" || a.documentType === documentType,
    );

  return documents;
};

export const getAllProducts = async () => {
  const documents = await getAllOfDocumentType(Const.DOC_TYPE_PROD);

  if (documents.length === 0) {
    throw new Error("No products found!");
  }

  return documents as Product[];
};

export const createNewProduct = async (newProduct: Product) => {
  const collectionRef = collection(database, Const.COLLECTION_NAME);
  // Remove ID as the addDoc function will give us a unique one.
  const { id, ...productWithoutId } = newProduct;
  // Add the document and get a reference back.
  const ref = await addDoc(collectionRef, productWithoutId);
  // Return a deep copied clone with the new ID attached.
  return { id: ref.id, ...structuredClone(productWithoutId) };
};

export const getProductById = async (id: string) => {
  const docRef = doc(database, Const.COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    throw new Error("Could not find product ID: " + id);
  }

  return { id: snapshot.id, ...snapshot.data() } as Product;
};

export const deleteDocumentByID = async (id: string) => {
  const docRef = doc(database, Const.COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

export const updateProductDocument = async (product: Product) => {
  const docRef = doc(database, Const.COLLECTION_NAME, product.id);
  const { id, ...productWithoutId } = product;
  await updateDoc(docRef, productWithoutId);
  return id;
};

export const createCartDocument = async () => {
  const docRef = doc(database, Const.COLLECTION_NAME, Const.CART_ID);
  const cart: Cart = {
    id: Const.CART_ID,
    documentType: Const.DOC_TYPE_CART,
    cartItems: [],
  };
  await setDoc(docRef, cart);
  return cart;
};

export const getCartDocument = async () => {
  const docRef = doc(database, Const.COLLECTION_NAME, Const.CART_ID);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    const newCart: Cart = await createCartDocument();
    return newCart;
  }

  return { id: snapshot.id, ...snapshot.data() } as Cart;
};

export const updateCartDocument = async (cart: Cart) => {
  const docRef = doc(database, Const.COLLECTION_NAME, cart.id);
  const { id, ...cartWithoutId } = cart;
  await updateDoc(docRef, cartWithoutId);
  return id;
};

export const createProductStockID = (productID: string, stock: number) => {
  return productID + "~" + stock;
};

export const readProductStockID = (cartItem: CartItem) => {
  const split = cartItem.productStockID.split("~");
  return {
    productID: split[0],
    stockIndex: parseInt(split[1]),
  };
};

export const addItemToCart = async (cartItem: CartItem) => {
  const prevCart = await getCartDocument();
  const updatedCart = { ...prevCart };
  let wasInCart = false;
  // This function will return the new cart
  // amount and the maximum possible.

  for (let i = 0; i < updatedCart.cartItems.length; i++) {
    const nextCartItem = updatedCart.cartItems[i];
    if (nextCartItem.productStockID === cartItem.productStockID) {
      nextCartItem.count += cartItem.count;
      wasInCart = true;
      break;
    }
  }

  // If item was not in cart then just add it.
  if (!wasInCart) {
    updatedCart.cartItems.push(cartItem);
  }

  const cartCountReport = {
    current: 0,
    maximum: 0,
  };

  // Asynchonously validate all the items in the cart.
  updatedCart.cartItems = await Promise.all(
    updatedCart.cartItems.map(async (ci: CartItem) => {
      // Check to see if we have too many of this item in the cart.
      const itemIDs = readProductStockID(ci);

      const productData = await getProductById(itemIDs.productID);
      const maxQuantity = productData.stock[itemIDs.stockIndex].quantity;
      if (ci.count > maxQuantity) {
        ci.count = maxQuantity;
      }
      if (ci.productStockID === cartItem.productStockID) {
        cartCountReport.current = ci.count;
        cartCountReport.maximum = maxQuantity;
      }

      return ci;
    }),
  );

  updatedCart.cartItems = updatedCart.cartItems.filter(
    // Filter out all items that have 0 or less.
    (cartItem: CartItem) => cartItem.count > 0,
  );

  // Update cart data.
  //console.log("Cart Items: ", updatedCart.cartItems);
  await updateCartDocument(updatedCart);

  return cartCountReport;
};

export const createPlaceHolderCart = () => {
  return {
    id: Const.CART_ID,
    documentType: Const.DOC_TYPE_CART,
    cartItems: [],
  } as Cart;
};

export const subscribeToCart = (
  callback: React.Dispatch<React.SetStateAction<Cart>>,
) => {
  const docRef = doc(database, Const.COLLECTION_NAME, Const.CART_ID);

  const unsub = onSnapshot(docRef, (snapshot) => {
    if (!snapshot.exists()) return;
    callback({ id: snapshot.id, ...snapshot.data() } as Cart);
  });

  return unsub;
};

export const purchaseCart = async () => {
  const cart = await getCartDocument();
  for (let i = 0; i < cart.cartItems.length; i++) {
    const cartItem: CartItem = cart.cartItems[i];

    const ids = readProductStockID(cartItem);
    const product = await getProductById(ids.productID);
    product.stock[ids.stockIndex].quantity -= cartItem.count;
    if (product.stock[ids.stockIndex].quantity < 0)
      product.stock[ids.stockIndex].quantity = 0;

    updateProductDocument(product);
  }

  cart.cartItems = [];
  updateCartDocument(cart);
};
