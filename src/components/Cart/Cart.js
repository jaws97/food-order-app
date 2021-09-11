import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const cartCTX = useContext(CartContext);
  const totalAmount = `₹${cartCTX.totalAmount.toFixed(2)}`;
  const hasItems = cartCTX.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const addItemHandler = (item) => {
    cartCTX.addItem(item);
  };

  const removeItemHandler = (id) => {
    cartCTX.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitDataHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://custom-hooks-812bd-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCTX.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(false);
    cartCTX.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCTX.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span> {totalAmount} </span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitDataHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingData = <p>Sending order data...</p>;
  const didSubmitData = (
    <>
      <p>Your order has been placed successfully!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  const emptyCart = (
    <>
      <p>No item in cart!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onClose}>
      {!isSubmittingData && !didSubmitData && cartModalContent}
      {isSubmittingData && !didSubmitData && isSubmittingData}
      {!isSubmittingData && didSubmitData && didSubmitData}
      {cartCTX.items.length === 0 && emptyCart}
    </Modal>
  );
}

export default Cart;
