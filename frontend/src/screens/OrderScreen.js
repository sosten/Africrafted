import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Store } from "../Store";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import style from "../styles/OrderScreen.module.css";
import { getError } from "../utils";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
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
    case "PAY_RESET": {
      return { ...state, loadingPay: false, successPay: false };
    }
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
};

const OrderScreen = () => {
  const params = useParams();
  const { id: orderId } = params;

  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/order/${order._id}/pay`,
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

    if (!userInfo) {
      return navigate("/login");
    }

    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
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
    payPalDispatch,
    order,
    userInfo,
    orderId,
    navigate,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "DELIVER_FAIL" });
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="row">
            <div className={style.order_header}>
              <h1>Order ID: {orderId}</h1>
            </div>
            <div className="col-8">
              <div className={style.order_details}>
                <h3>Shipping</h3>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName}
                </p>
                <p>
                  <strong>Address:</strong> {order.shippingAddress.address},
                  {order.shippingAddress.city}, {order.shippingAddress.country},
                  {order.shippingAddress.zipCode}
                </p>
                {order.isDelivered ? (
                  <div>
                    <p>
                      <strong>Status:</strong> Delivered at: {order.deliveredAt}
                    </p>
                    <hr />
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>Status:</strong> Not delivered
                    </p>
                    <hr />
                  </div>
                )}
                <h3>Payment</h3>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                <div>
                  {order.isPaid ? (
                    <div>
                      <p>
                        <strong>Paid At:</strong> {order.paidAt}
                      </p>
                      <hr />
                    </div>
                  ) : (
                    <div>
                      <p>
                        <strong>Status:</strong> Not Paid
                      </p>
                      <hr />
                    </div>
                  )}

                  <div>
                    <h3>items</h3>
                    {order.orderItems.map((item) => (
                      <div key={item._id}>
                        <div className="row">
                          <div className="col-2">
                            <div className={style.item_img}>
                              <img src={item.image} alt={item.productName} />
                            </div>
                          </div>
                          <div className="col-10">
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
              </div>
            </div>
            <div className="col-4">
              {
                <div className={style.order_summary}>
                  <div className={style.order_summary_header}>
                    <h3>Order Summary</h3>
                  </div>
                  <div className={style.order_summary_row}>
                    <p>Item(s) Price</p>
                    <p>${order.itemsPrice.toFixed(2)}</p>
                  </div>
                  <div className={style.order_summary_row}>
                    <p>Shipping</p>
                    <p>${order.shippingPrice.toFixed(2)}</p>
                  </div>
                  <div className={style.order_summary_row}>
                    <p>Tax</p>
                    <p>${order.taxPrice.toFixed(2)}</p>
                  </div>
                  <div className={style.order_summary_total}>
                    <p>
                      <b>Total</b>
                    </p>
                    <p>
                      <b>${order.totalPrice.toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              }

              {!order.isPaid && (
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
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  {loadingDeliver && <LoadingSpinner></LoadingSpinner>}
                  <div className="d-grid">
                    <Button type="button" onClick={deliverOrderHandler}>
                      Deliver Order
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScreen;
