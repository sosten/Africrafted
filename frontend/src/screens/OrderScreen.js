import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, loading: false, error: false, order: action.payload};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
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

const [{loading, error, order}, dispatch] = useReducer(reducer, {
  order: {},
  loading: true,
  error: '',
  
});

useEffect(() => {
  const fetchData = async () => {
    try {
      dispatch ({type: 'FETCH_REQUEST'});
      const { data } = await Axios.get(`/api/order/${orderId}`, {
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

  if(!order._id || (order._id && order._id !== orderId)){
    fetchData();
  }
}, [order, userInfo, orderId, navigate]);

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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderScreen;