import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import SideBar from '../components/SideBar';
import style from '../styles/AdminEditProduct.module.css';
import { useContext } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
      case "PRODUCT_CREATE_REQUEST":
        return { ...state, loading: true };
      case "PRODUCT_CREATE_SUCCESS":
        return { ...state, loading: false, product: action.payload };
      case "PRODUCT_CREATE_FAIL":
        return { ...state, loading: false, error: action.payload };
      case "PRODUCT_CREATE_RESET":
        return { ...state };
      default:
        return state;
    }
  };

const AdminEditProduct = () => {
    const params = useParams();
    const { id } = params;

    const[{loading, error, product}, dispatch] = useContext(reducer, {loading: false, error: '', product: []});
    const [productName, setProductName] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [artistName, setArtistName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          dispatch({ type: "PRODUTCT_EDIT_REQUEST", loading: false });
          try {
            const result = await axios.get(`/api/product/${id}`);
            dispatch({
              type: "PRODUCT_EDIT_SUCCESS",
              loading: false,
              payload: result.data,
            });
            setProductName(product.productName);
            setSlug(product.slug);
            setCategory(product.category);
            setPrice(product.price);
            setCountInStock(product.countInStock);
            setDescription(product.description);
            setImage(product.image);
            setArtistName(product.artistName);
          } catch (error) {
            dispatch({
              type: "PRODUCT_EDIT_FAIL",
              loading: false,
              payload: error.message,
            });
          }
        };
        fetchData();
      }, [id, dispatch, product.productName, product.slug, product.price, product.category, product.image, product.countInStock,product.artistName,product.description]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "PRODUCT_CREATE_REQUEST", loading: true });
        try {
          const { data } = await axios.post("/api/product", {
            slug,
            artistName,
            productName,
            description,
            image,
            price,
            category,
            countInStock,
          });
          console.log(data);
          dispatch({
            type: "PRODUCT_CREATE_SUCCESS",
            loading: false,
            payload: data,
          });
        } catch (error) {
          dispatch({ type: "PRODUCT_CREATE_FAIL" });
          console.log(error);
        }
      };
  return (
    <div className={style.container}>
        <div className={style.left}>
            <SideBar />
        </div>
        <div className={style.top}>
            <AdminNavbar />
            <div className={style.header}>
                <div className={style.product_btn}>
                    <Link to={'/admin/products'}><BsArrowLeft className={style.icon} /><span>Products</span></Link>
                </div>
                <h1>Update Product</h1>
            </div>
            <div className={style.form_container}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="myFile"
                />
                <label htmlFor="pname">Product Name</label>
                <input
                  type="text"
                  id="pname"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  id="slug"
                  onChange={(e) => setSlug(e.target.value)}
                  value={slug}
                  placeholder="Must be the same as product name"
                />
                <label htmlFor="aname">Artist Name</label>
                <input
                  type="text"
                  id="aname"
                  onChange={(e) => setArtistName(e.target.value)}
                  value={artistName}
                />
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
                <label htmlFor="count">Count in stock</label>
                <input
                  type="number"
                  id="count"
                  onChange={(e) => setCountInStock(e.target.value)}
                  value={countInStock}
                />
                <label htmlFor="desc">Description</label>
                <textarea
                  cols="30"
                  rows="10"
                  id="desc"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
                <input type="submit" value="Add Product" />
              </form>
            </div>
          </div>
        </div>
      )
    }

export default AdminEditProduct