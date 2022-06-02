import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import style from '../styles/OrderHistoryScreen.module.css';

const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true}
        case 'FETCH_SUCCESS':
            return {...state, loading: false, error: false, orders: action.payload}
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default: 
            return state;
    }
}

const AdminOrders = () => {
    const[{loading, error, orders}, dispatch] = useReducer(reducer, {
        loading: true,
        error: ""
    });

    useEffect(()=>{
        dispatch({type: 'FETCH_REQUEST', loading: true});
        const fetchOrders = async() => {
            try {
                const result = await axios.get('/api/orders');
                dispatch({type: 'FETCH_SUCCESS', loading: false, payload: result.data});
            } catch (error) {
                dispatch({type: 'FETCH_FAIL', loading: false, payload: error.message});
                console.log(error)
            }
        }
        fetchOrders();
    }, []);

  return (
    <div className={style.order_container}>
        {loading ? (<LoadingSpinner />) : error ? (<div>{error}</div>) : (
            <div className='container'>
                <div className={style.header}>
                    <h1>Orders</h1>
                </div>
                <div className='table-responsive'>
                    <table className='table table-sm table-hover table-light'>
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
                                orders.map((order)=>(
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.isPaid.substring(0, 10) : 'No'}</td>
                                        <td>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                        <span>Delete</span>
                                        {/* <button onClick={()=> navigate(`/order/${order._id}`)} className={style.order_btn}>View Detail</button> */}
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

export default AdminOrders