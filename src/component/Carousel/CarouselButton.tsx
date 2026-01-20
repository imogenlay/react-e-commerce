import classes from "./Carousel.module.scss";

interface Props {
  moveToIndex: () => void;
  left: boolean;
}

export default function CarouselButton({ moveToIndex, left }: Props) {
  const buttonClass = left ? classes.left : classes.right;
  const image = "/" + (left ? "left" : "right") + ".svg";

  return (
    <button onClick={moveToIndex} className={buttonClass}>
      <img src={image} />
    </button>
  );
}
