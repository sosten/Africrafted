import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import SideBar from '../components/SideBar';
import style from '../styles/AdminAddUser.module.css';

const AdminAddUser = () => {
  return (
    <div className={style.container}>
        <div className="left">
            <SideBar />
        </div>
        <div className="top">
            <AdminNavbar />
            <div className='form_container'>
                <form>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" />
                </form>
            </div>
        </div>
    </div>
  )
}

export default AdminAddUser;