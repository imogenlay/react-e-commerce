import Const from "../../services/const";
import { deleteDocumentByID } from "../../services/services";
import classes from "./DebugPage.module.scss";
import {
  deleteEntireCollection,
  forceResetEntireCollection,
} from "../../services/forceReset";

export default function DebugPage() {
  const restock = async (editCollection: () => Promise<void>) => {
    await deleteDocumentByID(Const.CART_ID);
    await editCollection();
  };

  return (
    <main>
      <h1 className={classes.title}>Debug</h1>
      <div className={classes.debug}>
        <button
          className={classes.restock}
          onClick={() => restock(forceResetEntireCollection)}
        >
          Restock All Products
        </button>
        <button
          className={classes.restock}
          onClick={() => restock(deleteEntireCollection)}
        >
          Delete All Products
        </button>
      </div>
    </main>
  );
}
