import React, { useContext, useEffect, useReducer } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import LoadingSpinner from "../components/LoadingSpinner";
import style from "../styles/PlaceOrderScreen.module.css";
import Navbar from "../components/Navbar";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrderScreen = () => {
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await Axios.post(
        "/api/order",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" });
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <div className={style.header}>
          <h1>Preview Order</h1>
        </div>
        <div className={style.row}>
          <div className={style.col}>
            <div>
              <h2>Shipping Address</h2>
              <p>
                <b>Address:</b> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.country}
              </p>
              <Link to="/shipping">Edit</Link>
              <hr />
            </div>

            <div>
              <h2>Payment</h2>
              <p>
                <b>Method:</b> {cart.paymentMethod}
              </p>
              <Link to="/payment">Edit</Link>
              <hr />
            </div>

            <div>
              <h2>Items</h2>
              {cart.cartItems.map((item) => (
                <div key={item.id}>
                  <div className={style.item_container}>
                    <div>
                      <img src={item.image} alt={item.productName} />
                    </div>
                    <div>
                      <p>Name: {item.productName}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <Link to={`/product/${item.slug}`}>Edit</Link>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
          <div className={style.order_summary}>
            <div className={style.order_header}>
              <h2>Order Summary</h2>
            </div>
            <div className={style.order_cont}>
              <p>Item(s) price :</p>
              <p> ${cart.itemsPrice.toFixed(2)}</p>
            </div>
            <div className={style.order_cont}>
              <p>Shipping :</p>
              <p> ${cart.shippingPrice.toFixed(2)}</p>
            </div>
            <div className={style.order_cont}>
              <p>Tax :</p>
              <p> ${cart.taxPrice.toFixed(2)}</p>
            </div>
            <hr />
            <div className={style.order_cont}>
              <p>
                <strong>Total Price</strong> :
              </p>
              <p>
                {" "}
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </p>
            </div>
            <br />
            <button
              type="button"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            <br />
            {loading && <LoadingSpinner />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;