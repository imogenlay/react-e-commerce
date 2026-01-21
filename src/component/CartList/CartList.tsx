import Const from "../../services/const";
import type { CartElement } from "../../services/types";
import { priceFormatter } from "../../services/utils";
import classes from "./CartList.module.scss";

interface Props {
  cartElements: CartElement[];
  modifyItem: (cartElement: CartElement, offset: number) => void;
}

export const CartList = ({ cartElements, modifyItem }: Props) => {
  return (
    <>
      {cartElements.map((cartElement: CartElement) => {
        return (
          <div
            key={cartElement.id + cartElement.variant}
            className={classes.cart_element}
          >
            <div className={classes.image_container}>
              <img src={Const.IMAGE_LOCATION + cartElement.image} />
            </div>
            <div className={classes.info_container}>
              <p className={classes.info_title}>
                {cartElement.name} - {cartElement.variant}
              </p>
              <div className={classes.button_container}>
                <p className={classes.quantity_label}>Quantity:</p>
                <button onClick={() => modifyItem(cartElement, +1)}>+</button>
                <button onClick={() => modifyItem(cartElement, -1)}>-</button>
                <p>{cartElement.count}</p>
              </div>
              <p> {priceFormatter(cartElement.count * cartElement.price)}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
