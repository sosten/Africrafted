import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import style from "../styles/PaymentScreen.module.css";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Paypal"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  return (
    <div className={style.form_container}>
      <div className={style.form_flex}>
        <div className="form_container">
          <form onSubmit={handleSubmit}>
            <div className="header">
              <h1>Payment Method</h1>
            </div>
            <input
              type="radio"
              id="Paypal"
              value={"Paypal"}
              checked={paymentMethodName === "Paypal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
            <label htmlFor="Paypal">Paypal</label>
            <br />
            <input
              type="radio"
              id="Stripe"
              value={"Stripe"}
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
            <label htmlFor="Stripe">Stripe</label>
            <br />
            <input type="submit" value="Continue" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;