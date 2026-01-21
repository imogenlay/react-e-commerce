import Const from "./const";
import {
  createCartDocument,
  createNewProduct,
  deleteDocumentByID,
  getAllProducts,
} from "./services";
import type { Product } from "./types";

class OrderIDs {
  static ids: number[] = [];
}

export const forceResetEntireCollection = async () => {
  const startTime = Date.now();
  await deleteEntireCollection();
  OrderIDs.ids = [];

  // Create All
  add("Aerin", "Rose Gold~ffd2c2", "Silver~d4dcec");
  /* prettier-ignore */
  add("Byron", "Amethyst~7268a5", "Latte~6e4a26", "Smoke~c4c4c4", "Wheat~edddc6");
  add("Cara", "Bare~e7c9be", "Brown~926b44", "Forest~506f5f");
  add("Drew", "Strawberry~faa8a8");
  /* prettier-ignore */
  add("Duckworth", "Blonde Tortoise~e4a30b", "Candy Brown~976540", "Cioccolato~792501", "Citrus~e6abb4", "Clear~fcfcfc");
  /* prettier-ignore */
  add("Evie", "Blueberry~536893", "Clear~fcfcfc", "Marshmallow~cf8776", "Moss~566a12", "Toffee~daa653");
  add("Frieda", "Orchid~d988ff");
  add("Gigi", "Autumn~cd800a", "Obsidian~404040");
  /* prettier-ignore */
  add("Humphrey", "Clear~fcfcfc", "Gold Amethyst~eebd81", "Oak~966954", "Wheat~edddc6");
  add("Jas", "Amber~f9e4c5", "Black~404040");
  /* prettier-ignore */
  add("Jinky", "Cherry~c7000c", "Cobalt~0046b8", "Crystal Pine~bfb74c", "Tortoise~77929b");
  add("Jorja", "Soda~afc2d0", "Bare~e7c9be");
  /* prettier-ignore */
  add("Mesa", "Auburn~452121","Blackberry~191919", "Cobalt~0030a7", "Lagoon~53d1df", "Scary~db1187");
  /* prettier-ignore */
  add("Mumford", "Autumn~f1a916", "Bare~e7c9be", "Brown~b48a74", "Clear~fcfcfc", "Cobalt~0030a7");
  /* prettier-ignore */
  add("Parker", "Clear~fcfcfc", "Jade~77948f", "Strawberry~fbdfeb", "Tortoise~96653d");
  add("Sabrina", "Autumn~cb902a", "Bare~b89c86", "Tortoise~2e1603");
  /* prettier-ignore */
  add("Serge", "Cherry~a42022", "Cobalt~0244b2", "Lagoon~6fd2d8", "Tobacco~ba6b02", "Tortoise~01358b");
  add("Zola", "Marshmallow~e4b9b7");

  await deleteDocumentByID(Const.CART_ID);
  await createCartDocument();

  const endTime = Date.now();
  console.log(endTime - startTime, "ms");
};

export const deleteEntireCollection = async () => {
  try {
    // Delete All
    const allProducts = await getAllProducts();
    await Promise.all(
      allProducts.map((product) => deleteDocumentByID(product.id)),
    );
  } catch (e) {
    console.log("Force delete collection: Nothing to delete.");
  }
};

const add = (name: string, ...stockVariants: string[]) => {
  createNewProduct(easyProductCreator(name, stockVariants));
};

const easyProductCreator = (name: string, stockVariants: string[]) => {
  const price = 109 + Math.floor(Math.random() * 12.5) * 10;
  const favourite = Math.random() < 0.2;
  let order: number = -1;
  while (true) {
    // Generate unique order number.
    order = Math.floor(Math.random() * 10_000_000);
    if (!OrderIDs.ids.includes(order)) {
      OrderIDs.ids.push(order);
      break;
    }
  }

  const product: Product = {
    id: "",
    favourite,
    name,
    price,
    order,
    documentType: Const.DOC_TYPE_PROD,
    stock: [],
  };

  for (let i = 0; i < stockVariants.length; i++) {
    // Generate each stock item.
    const [variantName, variantColor] = stockVariants[i].split("~");
    const imageFilename =
      (name + " " + variantName).toLowerCase().replaceAll(" ", "_") + ".jpg";

    const quantity = Math.floor(Math.random() * 10);

    product.stock.push({
      variant: variantName,
      color: variantColor,
      image: imageFilename,
      quantity: quantity,
    });
  }

  return product;
};
