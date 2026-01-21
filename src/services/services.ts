import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "../config/firestore.ts";
import type { Product } from "./types.ts";
import Const from "./const.ts";

export const getAllProducts = async () => {
  const collectionRef = collection(database, Const.COLLECTION_NAME);
  const snapshot = await getDocs(collectionRef);

  const products: Product[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];

  if (products.length === 0) {
    throw new Error("No products found!");
  }

  return products;
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

export const deleteProductByID = async (id: string) => {
  const docRef = doc(database, Const.COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

export const updateProductById = async (product: Product) => {
  const docRef = doc(database, Const.COLLECTION_NAME, product.id);
  const { id, ...productWithoutId } = product;
  await updateDoc(docRef, productWithoutId);
  return id;
};
