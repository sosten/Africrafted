import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import SimpleAreaChart from '../components/SimpleAreaChart';
import Chart from '../components/Chart';
import SideBar from '../components/SideBar';
import Widget from '../components/Widget';
import style from '../styles/Dashboard.module.css';
import LatestTransactions from './LatestTransactions';

const DashboardScreen = () => {
  return (
    <div className={style.dashboard}>
      <div className={style.side_bar}>
        <SideBar />
      </div>
      <div className={style.top_navbar}>
        <AdminNavbar />
        <div className={style.widget}>
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning"/>
          <Widget type="balance"/>
        </div>
        <div className={style.revenue_wrapper}>
          <div className={style.revenue}>
            <Chart />
          </div>
          <div className={style.area_chart}>
            <SimpleAreaChart />
          </div>
        </div>
        <div className={style.transaction_table}>
          <LatestTransactions />
        </div>
      </div>
    </div>
  )
}

export default DashboardScreen;