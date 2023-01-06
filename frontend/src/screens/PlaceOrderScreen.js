import React, { useContext, useEffect, useReducer } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import LoadingSpinner from "../components/LoadingSpinner";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { getError } from "../utils";
import { toast } from "react-toastify";
import style from "../styles/PlaceOrderScreen.module.css";
import Navbar from "../components/Navbar";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };

    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: false, order: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET": 
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
};

const PlaceOrderScreen = () => {
  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, successPay, loadingPay, order }, dispatch] = useReducer(reducer, {
    successPay: false,
    loadingPay: false,
    loading: false,
    order: {},
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

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: cart.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.post(
          `/api/order/pay`,
          details,
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success('Order is paid');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  };

  const onError = (err) => {
    toast.error(getError(err));
  };

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

    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/order/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.massage });
      }
    };

    

    if (!cart.paymentMethod) {
      navigate("/payment");
    }
    if (!userInfo) {
      return navigate("/login");
    }

    if (
      successPay ||
      (orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPayPalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        payPalDispatch({
          type: "resetOptions",
          value: { "client-id": clientId, currency: "USD" },
        });
        payPalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPayPalScript();
    }
  }, [
    cart,
    payPalDispatch,
    userInfo,
    orderId,
    navigate,
    successPay,
  ]);

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
              <h2>Item(s)</h2>
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
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <div>
              <h2>Payment Method</h2>
              {/* <p><b>Method:</b> {cart.paymentMethod}</p> */}
              {/* <Link to="/payment">Edit</Link> */}
              {/* <hr /> */}
              <div>
                  {isPending ? (
                    <LoadingSpinner />
                  ) : (
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <LoadingSpinner />}
                </div>
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