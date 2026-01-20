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
    if (newIndex >= 0 && newIndex < items.length) {
      updateCarouselIndex(newIndex);
    }
  };

  // Generate a CSS object that will be applied to the elements
  // in order to offset them from center.

  const generateOffset = (i: number) => ({
    left: (i - currentIndex) * 100 + "%",
  });

  const showButtonLeft = currentIndex > 0;
  const showButtonRight = currentIndex < items.length - 1;

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
              <img src={item} />
            </div>
          );
        })}
      </div>

      {showButtonLeft && (
        <CarouselButton
          moveToIndex={() => moveToIndex(currentIndex - 1)}
          left={true}
        />
      )}
      {showButtonRight && (
        <CarouselButton
          moveToIndex={() => moveToIndex(currentIndex + 1)}
          left={false}
        />
      )}
    </div>
  );
}
