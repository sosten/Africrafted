import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingSpinner from '../components/LoadingSpinner';
import { BsCreditCard } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
import { GrMoney } from 'react-icons/gr';
import AdminNavbar from '../components/AdminNavbar';
import SideBar from '../components/SideBar';
import style from '../styles/Dashboard.module.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function AdminDashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className={style.navbar_wrapper}>
      <div className={style.side_bar}>
        <SideBar />
      </div>
      <div className={style.side_cont} >
      <AdminNavbar />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className={style.card_container}>
            <div className={style.card_cont}>
              <BsPeople className={style.icon} />
              <h1>
                {summary.users && summary.users[0]
                  ? summary.users[0].numUsers
                  : 0}
              </h1>
              <h2> Users</h2> 
            </div>
            <div  className={style.card_cont}>
              <BsCreditCard className={style.icon} />
              <h1>
                {summary.orders && summary.users[0]
                  ? summary.orders[0].numOrders
                  : 0}
              </h1>
              <h2> Orders</h2>
            </div>
            <div  className={style.card_cont}>
              <GrMoney className={style.icon} />
              <h1>
                $
                {summary.orders && summary.users[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </h1>
              <h2> Orders</h2>
            </div>
          </div>
          <div className={style.sales_container}>
            <div className={style.sales_card}>
              <h2>Sales</h2>
              {summary.dailyOrders.length === 0 ? (
                <h2>No Sale</h2>
              ) : (
                <Chart
                  width="100%"
                  height="350px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div className={style.category}>
              <h2>Categories</h2>
              {summary.productCategories.length === 0 ? (
                <h2>No Category</h2>
              ) : (
                <Chart
                  width="100%"
                  height="300px"
                  chartType="PieChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ['Category', 'Products'],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                ></Chart>
              )}
            </div>
        </>
      )}
      </div>
    </div>
  );
}