import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, loading: false, error: false, order: action.payload};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
    case 'PAY_REQUEST':
      return {...state, loadingPay: true};
    case 'PAY_SUCCESS': 
      return {...state, loadingPay: false, successPay: true};
    case 'PAY_FAIL':
      return {...state, loadingPay: false, errorPay: action.payload};
    case 'PAY_RESET': {
      return {...state, loadingPay: false, successPay: false};
    }
    default:
      return state;
  }
}

const OrderScreen = () => {
const params = useParams();
const { id: orderId } = params;

const navigate = useNavigate();
const { state } = useContext(Store);
const { userInfo } = state;

const [{loading, error, order, successPay, loadingPay}, dispatch] = useReducer(reducer, {
  order: {},
  loading: true,
  error: '',
  successPay: false,
  loadingPay: false
  
});

const [{isPending}, payPalDispatch] = usePayPalScriptReducer();

const createOrder = (data, actions) => {
  return actions.order
    .create({
      purchase_units : [{amount: {value: order.totalPrice}}]
    })
    .then((orderId) => {
      return orderId;
    })
}

const onApprove = (data, actions) => {
  return actions.order.capture.then(async function(details){
    try {
      dispatch({ type: 'PAY_REQUEST'});
      const { data } = await axios.put(`/api/order/${order._id}/pay`, details,
      {headers: {authorization: `Bearer ${userInfo.token}`}}
      );
      dispatch({type: 'PAY_SUCCESS', payload: data})
      
    } catch (err) {
      dispatch({type: 'PAY_FAILS', payload: data.err});
      console.log(err)
    }
  });
}

const onError = (err) => {
  console.log(err);
}

useEffect(() => {
  const fetchOrder = async () => {
    try {
      dispatch ({type: 'FETCH_REQUEST'});
      const { data } = await axios.get(`/api/order/${orderId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` }
      })
      dispatch({type: 'FETCH_SUCCESS', payload: data})
    } catch (error) {
      dispatch({type: 'FETCH_FAIL', payload:error.massage})
    }
  };

  if(!userInfo) {
    return navigate('/login');
  }

  if(!order._id || successPay || (order._id && order._id !== orderId)){
    fetchOrder();
    if(successPay) {
      dispatch({type: 'PAY_RESET'})
    }
  } else {
    const loadPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/paypal',
      {headers: {authorization: `Bearer ${userInfo.token}`}});
      payPalDispatch({type: 'resetOptions', value:{'client-id': clientId, currency: 'USD'}});
      payPalDispatch({type: 'setLoadingStatus', value: 'pending'})
    }
    loadPayPalScript()
  }
}, [order, userInfo, orderId, navigate, payPalDispatch, successPay]);


  return (
    <div>
      {loading ? (<div>Loading...</div>):
      error ? (<div>{error}</div>):(
        <div>
          <h1>Order ID: {orderId}</h1>
          <hr />
          <div>
            <h3>Shipping</h3>
            <p><strong>Name:</strong > {order.shippingAddress.fullName}</p>
            <p><strong>Address:</strong> {order.shippingAddress.address}, 
            {order.shippingAddress.city}, {order.shippingAddress.country},
            {order.shippingAddress.zipCode}</p>
            <hr />
            {order.isDelivered ? (
              <div>
                <p>Delivered at: {order.deliveredAt}</p>
                <hr />
              </div>
            ):(
              <div>
                <p>Not delivered</p>
                <hr />
              </div>
            )
          }
            <h3>Payment</h3>
            <p><strong>Method:</strong> {order.paymentMethod}</p> 
            <hr />
            <div>
              {order.isPaid ? (
                <div>
                  <p><strong>Paid At:</strong> {order.paidAt}</p>
                  <hr />
                </div>
              ):(
                <div>
                  <p>Not Paid</p>
                  <hr />
                </div>
              )}

              <div>
                <h3>items</h3>
                {
                  order.orderItems.map((item)=>(
                    <div key={item._id}>
                      <p><img src={item.image} alt={item.productName} /></p>
                      <p>Name: {item.productName}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <Link to={`/product/${item.slug}`}>Edit</Link>
                      <hr />
                    </div>
                  ))
                }
              </div>
              <div>
                <h3>Order Summary</h3>
                {
                  <div>
                    <p>Item(s) Price ${order.itemsPrice.toFixed(2)}</p>
                    <p>Shipping {order.shippingPrice.toFixed(2)}</p>
                    <p>Tax {order.taxPrice.toFixed(2)}</p>
                    <p>Total {order.totalPrice.toFixed(2)}</p>
                  </div>

                }

                {
                  !order.isPaid && (
                    <div>
                      { isPending ? (
                        <div>Loading...</div>
                        ) : (
                        <div>
                            <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                            ></PayPalButtons>
                        </div>
                        )
                      }
                      {loadingPay && (<div>Loading...</div>)}
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderScreen;