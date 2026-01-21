import type { StockItem } from "../../services/types";
import classes from "./StockPicker.module.scss";

interface StockProps {
  stock: StockItem;
  updateVariant: () => void;
}

export default function StockPicker({ stock, updateVariant }: StockProps) {
  return (
    <div
      key={stock.variant}
      className={classes.stock_picker}
      style={{ backgroundColor: "#" + stock.color }}
      onClick={updateVariant}
    >
      {stock.quantity === 0 && (
        <img className={classes.sold_out} src="/slash.svg" />
      )}
    </div>
  );
}
