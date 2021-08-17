import CartIcon from "../Cart/CartIcons";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context";

/*
useState korisitimo za dodoavanje animacije(klase) kondicijonalno na botun
numberOfCartItems zbraja ukupan broj stvari u cartu
onClick={props.onClicking} otvara modal
*/
const HeaderCartButton = (props) => {
  const [btnisHighlighted, setiBtnIsHighlited] = useState(false);

  const ctx = useContext(CartContext);

  const numberOfCartItems = ctx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);
  const { items } = ctx;

  const btnClasses = `${classes.button} ${
    btnisHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setiBtnIsHighlited(true);
    const timer = setTimeout(() => {
      setiBtnIsHighlited(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClicking}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
