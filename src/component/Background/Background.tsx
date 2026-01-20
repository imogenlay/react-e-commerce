import classes from "./Background.module.scss";

export default function Background() {
  return (
    <div className={classes.background}>
      <div className={`${classes.background_square} ${classes.a}`} />
      <div className={`${classes.background_square} ${classes.b}`} />
      <div className={`${classes.background_square} ${classes.c}`} />
      <div className={`${classes.background_square} ${classes.d}`} />
      <div className={`${classes.background_square} ${classes.e}`} />
    </div>
  );
}
