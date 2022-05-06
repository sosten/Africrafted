import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, loading: false, error: false, data: action.payload};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state;
  }
}

const OrderScreen = () => {

const { orderId } = useParams;

const navigate = useNavigate();
const { state } = useContext(Store);
const { userInfo } = state;

const [{loading, error, order}, dispatch] = useReducer(reducer, {
  loading: true,
  error: '',
  order: {}
});

useEffect(() => {
  const fetchData = async () => {
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

  if(!order._id || (order._id && order._id !== orderId)){
    fetchData();
  }
}, [order, userInfo, orderId, navigate]);

  return (
    <div>
      {loading ? (<div>Loading...</div>):
      error ? (<div>{error}</div>):(
        <div>
          <h1>Order {orderId}</h1>
        </div>
      )}
    </div>
  )
}

export default OrderScreen