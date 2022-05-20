import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Store } from '../Store';
import style from '../styles/OrderHistoryScreen.module.css';

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
            loading: true,
            error: '',
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
    <div className={style.order_container}>
        {loading ? (<LoadingSpinner />) : error ? (<div>{error}</div>) : (
            <div className='container'>
                <div className={style.header}>
                    <h1>Order History</h1>
                </div>
                <div className='table-responsive'>
                    <table className='table table-sm table-hover table-light'>
                    <caption>List of your Orders</caption>
                        <thead className='table-light'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">DATE</th>
                                <th scope="col">TOTAL</th>
                                <th scope="col">PAID</th>
                                <th scope="col">DELIVERED</th>
                                <th scope="col">ACTIONS</th>
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
                                        <button onClick={()=> navigate(`/order/${order._id}`)} className={style.order_btn}>View Detail</button>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
  )
}

export default OrderHistoryScreen