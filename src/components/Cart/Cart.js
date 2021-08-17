import Modal from "../UI components/Modal";
import classes from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../Store/cart-context";
import CartItem from "./CartItem";
//Prikazuje Cart i sve što je u njemu
const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalAmount = `${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)} //Bind koristimo da povežemo fajlove bez njega nebi radilo
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onCloseing={props.onCloseing}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseing}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={props.onCloseing}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
