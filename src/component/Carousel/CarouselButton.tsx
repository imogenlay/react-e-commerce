import Const from "../../services/const";
import classes from "./Carousel.module.scss";

interface Props {
  moveToIndex: () => void;
  left: boolean;
}

export default function CarouselButton({ moveToIndex, left }: Props) {
  const buttonClass = left ? classes.left : classes.right;
  const image = Const.IMAGE_LOCATION + (left ? "left.svg" : "right.svg");

  return (
    <button onClick={moveToIndex} className={buttonClass}>
      <img src={image} />
    </button>
  );
}
