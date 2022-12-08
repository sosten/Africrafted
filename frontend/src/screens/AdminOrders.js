import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { FiTrash2 } from "react-icons/fi";
import {  BsEyeFill } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import AdminNavbar from "../components/AdminNavbar";
import LoadingSpinner from "../components/LoadingSpinner";
import style from "../styles/AdminOrders.module.css";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: false, orders: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const AdminOrders = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST", loading: true });
    const fetchOrders = async () => {
      try {
        const result = await axios.get("/api/orders");
        dispatch({
          type: "FETCH_SUCCESS",
          loading: false,
          payload: result.data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          loading: false,
          payload: error.message,
        });
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  const navigate = useNavigate();

  return (
    <div className={style.order_container}>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className={style.container}>
          <div className={style.left}>
            <SideBar />
          </div>
          <div className={style.top}>
            <AdminNavbar />
            <div className={style.header}>
              <h1>Orders</h1>
              <p>{orders.length}</p>
            </div>
            <div className={style.table_container}>
              <table className="table table-sm table-hover table-light">
                <thead className="table-light">
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
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? order.isPaid.substring(0, 10) : "No"}
                      </td>
                      <td>
                        {order.deliveredAt
                          ? order.deliveredAt.substring(0, 10)
                          : "No"}
                      </td>
                      <td className={style.action}>
                       <span onClick={()=> navigate(`/order/${order._id}`)} className={style.view} title="View Order detail"><BsEyeFill className={style.view_icon}/></span> 
                       <span className={style.delete} title="Delete Order"><FiTrash2 className={style.delete_icon}/></span> 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;