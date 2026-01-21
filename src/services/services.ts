import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../config/firestore.ts";
import type { Cart, Product } from "./types.ts";
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

export const updateProductById = async (product: Product) => {
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

export const createProductStockID = (product: Product, stock: number) => {
  return product.id + "~" + stock;
};
