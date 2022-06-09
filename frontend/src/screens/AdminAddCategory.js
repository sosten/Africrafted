import React from 'react'
import style from '../styles/AdminAddCategory.module.css';
import SideBar from '../components/SideBar';
import AdminNavbar from '../components/AdminNavbar';

const AdminAddCategory = () => {
  return (
    <div className={style.container}>
        <div className={style.left}>
            <SideBar />
        </div>
        <div className={style.top}>
            <AdminNavbar />
            <div className="form_container">
                Add Category
            </div>
        </div>
    </div>
  )
}

export default AdminAddCategory;