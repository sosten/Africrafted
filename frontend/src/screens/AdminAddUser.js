import React from 'react';
import { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import SideBar from '../components/SideBar';
import style from '../styles/AdminAddUser.module.css';

const AdminAddUser = () => {
    const[file, setFile] = useState();
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

  return (
    <div className={style.container}>
        <div className={style.left}>
            <SideBar />
        </div>
        <div className={style.top}>
            <AdminNavbar />
            <div className={style.form_container}>
                <form>
                    <div className={style.file}>
                        <img src={ file ? URL.createObjectURL(file) : "/images/placeholder.png"} alt="No" />
                        <label htmlFor="img"><div className={style.upload_btn}>Upload Image</div></label>
                        <input type="file" id="img" style={{display: 'none'}} onChange={handleFile}/>
                    </div>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" />
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id='lname' />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                    <label htmlFor="pwd">Password</label>
                    <input type="password" id="pwd" />
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id='phone' placeholder='+123 456 7890' />
                    <label htmlFor="address">Address</label>
                    <input type="text" id='address' />
                    <label htmlFor="country">Country</label>
                    <input type="text" id='country' />
                    <input type="submit" value="Add User" />
                </form>
            </div>
        </div>
    </div>
  )
}

export default AdminAddUser;