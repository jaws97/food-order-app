import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.length < 5;

function Checkout(props) {
    const [formInputValidity, setFormInputValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = !isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        city:enteredCityIsValid,
        postalCode:enteredPostalIsValid
    })
    console.log("heree")
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;
    
    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postalCode:enteredPostal
    });

  };

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formInputValidity.postalCode && <p>Please enter a valid postal Code!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
