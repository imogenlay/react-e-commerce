import { NavLink, useLocation } from "react-router";
import Const from "../../services/const.ts";
import classes from "./NavBar.module.scss";

interface Link {
  to: string;
  text: string;
}

export default function NavBar() {
  const { pathname } = useLocation();

  const navLinks: Link[] = [
    { to: Const.PAGE_HOME, text: "Home" },
    { to: Const.PAGE_STORE, text: "Store" },
    { to: Const.PAGE_CART, text: "Cart" },
  ];

  return (
    <nav className={classes.nav}>
      {navLinks.map((l) => {
        if (pathname === l.to)
          return (
            <p className={classes.fake} key={l.text}>
              {l.text}
            </p>
          );

        return (
          <NavLink key={l.text} to={l.to}>
            {l.text}
          </NavLink>
        );
      })}
    </nav>
  );
}
