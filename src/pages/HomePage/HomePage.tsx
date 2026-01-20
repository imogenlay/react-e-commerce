import { useNavigate } from "react-router";
import classes from "./HomePage.module.scss";
import Const from "../../services/const";

export default function HomePage() {
  const navigate = useNavigate();

  const goToStore = () => {
    navigate(Const.PAGE_STORE);
  };

  return (
    <main className={classes.home}>
      <div className={classes.fit}>
        <h1 className={classes.title} onClick={goToStore}>
          Glasses Co.
        </h1>
        <div className={classes.shadow}>
          <div className={`${classes.shadow} ${classes.shadow_invisible}`} />
        </div>
      </div>
    </main>
  );
}
