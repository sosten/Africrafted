import React from 'react';
import SideBar from '../components/SideBar';
import AdminNavbar from '../components/AdminNavbar';
import style from '../styles/AdminSingleScreen.module.css';

const AdminSingleScreen = () => {
  return (
    <div className={style.container}>
        <div className={style.left}>
            <SideBar />
        </div>
        <div className={style.top}>
            <AdminNavbar />
            <div className={style.user_container}>
                <div className={style.user_info}>
                    <img src="/images/img.jfif" alt="user name" />
                    <div className={style.details}>
                        <div className={style.detail_cont}>
                            <span className={style.user_key}>Username:</span>
                            <span className={style.user_value}>John Smith</span>
                        </div>
                        <div>
                            <span className={style.user_key}>Email:</span>
                            <span className={style.user_value}>johnsmith@gmail.com</span>
                        </div>
                        <div>
                            <span className={style.user_key}>Address:</span>
                            <span className={style.user_value}>123 Luka, Street</span>  
                        </div>
                        <div>
                            <span className={style.user_key}>Country:</span>
                            <span className={style.user_value}>USA</span> 
                        </div>
                        <div>
                            <span className={style.user_key}>Phone:</span>
                            <span className={style.user_value}>+260 7777 30003</span>
                        </div>     
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminSingleScreen