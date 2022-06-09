import React from 'react';
import { useState, useReducer } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import SideBar from '../components/SideBar';
import style from '../styles/AdminAddProduct.module.css';

const reducer = (state, action) => {
    switch(action.type){
        case 'CREATE_REQUEST':
            return { ...state, loading: true }
        case 'CREATE_SUCCESS':
            return { ...state, loading: false, products: action.payload }
        case 'CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'CREATE_RESET':
            return { ...state, loading: false }
        default:
            return state;
    }
}

const AdminAddProduct = () => {

    const[{loading, error, products}, dispatch] = useReducer(reducer, {loading: true, error: "", products: {}});

    const [file, setFile] = useState();
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const[productName, setProductName] = useState()
    const[category, setCategory] = useState()
    const[price, setPrice] = useState()
    const[countInstock, setCountInstock] = useState()
    const[description, setDescription] = useState()
    const[image, setImage] = useState()
    const[artistName, setArtistName] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
  return (
    <div className={style.container}>
        <div className={style.left}>
            <SideBar />
        </div>
        <div className={style.top}>
            <AdminNavbar />
            <div className={style.form_container}>
                <form onSubmit={handleSubmit}>
                    <div className={style.file}>
                        <img src={file ? URL.createObjectURL(file) : "/images/placeholder.png"} alt="No" />
                        <label htmlFor="img"><div className={style.upload_btn}>Upload Image</div></label>
                        <input type="file" id="img" onChange={handleFile} style={{display: 'none'}}/>
                    </div>
                    <label htmlFor="pname">Product Name</label>
                    <input type="text" id="pname" />
                    <label htmlFor="category">Category</label>
                    <input type="text" id='category' />
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" />
                    <label htmlFor="count">Count in stock</label>
                    <input type="number" id="count" />
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