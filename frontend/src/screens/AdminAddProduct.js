import React from 'react';
import { BsFileEarmark } from 'react-icons/bs';
import AdminNavbar from '../components/AdminNavbar';
import SideBar from '../components/SideBar';
import style from '../styles/AdminAddProduct.module.css';

const AdminAddProduct = () => {
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
                        <img src="/images/placeholder.png" alt="No" />
                        <label htmlFor="img"><BsFileEarmark className={style.icon}/><div className={style.upload_btn}>Upload Image</div></label>
                        <input type="file" id="img" style={{display: 'none'}}/>
                    </div>
                    <label htmlFor="pname">Product Name</label>
                    <input type="text" id="pname" />
                    <label htmlFor="category">Category</label>
                    <input type="text" id='category' />
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" />
                    <label htmlFor="desc">Description</label>
                    <textarea cols="30" rows="10" id='desc'></textarea>
                    <input type="submit" value="Add Product" />
                </form>
            </div>
        </div>
    </div>
  )
}

export default AdminAddProduct;