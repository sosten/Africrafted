import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import SideBar from '../components/SideBar';
import DataTable from '../components/DataTable';
import style from '../styles/List.module.css';

const List = () => {
  return (
    <div className={style.list_container}>
        <div className={style.list_left}>
          <SideBar />
        </div>
        <div className={style.list_right}>
            <AdminNavbar />
            <div className={style.data_table}>
              <DataTable />
            </div>
            
        </div>
    </div>
  )
}

export default List;