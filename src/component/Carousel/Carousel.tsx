import Const from "../../services/const";
import classes from "./Carousel.module.scss";
import CarouselButton from "./CarouselButton";

interface Props {
  updateCarouselIndex: (index: number) => void;
  currentIndex: number;
  items: string[];
}

export default function Carousel({
  updateCarouselIndex,
  currentIndex,
  items,
}: Props) {
  // Change index of carousel. Position will be stored in parent state.
  const moveToIndex = (newIndex: number) => {
    /*if (newIndex < 0) updateCarouselIndex(items.length - 1);
    else if (newIndex >= items.length) updateCarouselIndex(0);
    else updateCarouselIndex(newIndex);*/

    if (newIndex >= 0 && newIndex < items.length) updateCarouselIndex(newIndex);
  };

  const generateOffset = (i: number) =>
    // Generate a CSS object that will be applied to the elements
    // in order to offset them from center.
    ({
      left: (i - currentIndex) * 100 + "%",
    });

  return (
    <div className={classes.carousel}>
      <div className={classes.center}>
        {items.map((item, i) => {
          return (
            <div
              key={item}
              className={classes.img_container}
              onClick={() => moveToIndex(i)}
              style={generateOffset(i)}
            >
              <img src={Const.IMAGE_LOCATION + item} />
            </div>
          );
        })}
      </div>
      {items.length > 1 && (
        <>
          <CarouselButton
            moveToIndex={() => moveToIndex(currentIndex - 1)}
            left={true}
          />
          <CarouselButton
            moveToIndex={() => moveToIndex(currentIndex + 1)}
            left={false}
          />
        </>
      )}
    </div>
  );
}
