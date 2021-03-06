import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useReducer } from "react";
import AdminNavbar from "../components/AdminNavbar";
import SideBar from "../components/SideBar";
import LoadingSpinner from "../components/LoadingSpinner";
import style from "../styles/AdminAddProduct.module.css";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_EDIT_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_EDIT_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "PRODUCT_EDIT_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PRODUCT_EDIT_RESET":
      return { ...state };
    case "FETCH_CATEGORY":
      return { ...state, loading: true, category: action.payload };
    default:
      return state;
  }
};

const AdminAddProduct = () => {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    product: {},
    category: []
  });

  const [file, setFile] = useState();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [artistName, setArtistName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "PRODUCT_EDIT_REQUEST", loading: true });
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
        type: "PRODUCT_EDIT_SUCCESS",
        loading: false,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "PRODUCT_EDIT_FAIL" });
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try{
        const result = await axios.get('/api/product_categories')
        dispatch({type: 'FETCH_CATEGORY', payload: result});

      } catch(error) {
          console.log(error)
      }
      
    }
    fetchCategory();
    
    dispatch({ type: "PRODUCT_EDIT_RESET" });
    setProductName("");
    setSlug("");
    setCategory("");
    setPrice(0);
    setCountInStock(0);
    setDescription("");
    setImage("");
    setArtistName("");
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className={style.container}>
          <div className={style.left}>
            <SideBar />
          </div>
          <div className={style.top}>
            <AdminNavbar />
            <div className={style.form_container}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={style.file}>
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "/images/placeholder.png"
                    }
                    alt="No"
                  />
                  <label htmlFor="img">
                    <div className={style.upload_btn}>Upload Image</div>
                  </label>
                  <input
                    type="file"
                    id="img"
                    onChange={handleFile}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </div>
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
                <select name="" id="category">
                  {category.map((category) => (
                    <option
                      value={category}
                      key={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {category}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                /> */}
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
      )}
    </div>
  );
};

export default AdminAddProduct;