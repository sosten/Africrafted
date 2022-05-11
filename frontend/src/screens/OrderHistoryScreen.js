import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true, error: false};
        case 'FETCH_SUCCESS':
            return {...state, loading: false, order: action.payload};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

const OrderHistoryScreen = () => {
    const navigate = useNavigate();

    const [{loading, error, order}, dispatch] = useReducer(reducer,
        {
            error: '',
            loading: false
        });

const { state }  = useContext(Store);
const { userInfo } = state;


    useEffect(()=>{
      const  fetchOrder = async () => {
          dispatch({type: 'FETCH_REQUEST'});
        try {
            const { data } = await axios.get(`/api/order/mine`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            dispatch({type: 'FETCH_SUCCESS', payload: data})
        } catch (error) {
            dispatch({type: 'FETCH_FAIL'});
            console.log(error)
        }
      }
      fetchOrder();
    }, [userInfo]);

  return (
    <div>
        {loading ? (<div>Loading...</div>) : error ? (<div>{error}</div>) : (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {
                    order.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? order.isPaid.substring(0, 10) : 'No'}</td>
                            <td>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                            <button onClick={()=> navigate(`/order/${order._id}`)}>Detail</button>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        )}
    </div>
  )
}

export default OrderHistoryScreen