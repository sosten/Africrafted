import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import SideBar from '../components/SideBar';
import style from '../styles/Dashboard.module.css';

const DashboardScreen = () => {
  return (
    <div className={style.dashboard}>
      <div className={style.side_bar}>
        <SideBar />
      </div>
      <div className={style.top_navbar}>
        <AdminNavbar />
        main container
      </div>
    </div>
  )
}

export default DashboardScreen;