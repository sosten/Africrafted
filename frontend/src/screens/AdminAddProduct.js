import axios from "axios";
import React from "react";
import { useEffect, useContext } from "react";
import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import AdminNavbar from "../components/AdminNavbar";
import SideBar from "../components/SideBar";
import LoadingSpinner from "../components/LoadingSpinner";
import style from "../styles/AdminAddProduct.module.css";
import { toast } from "react-toastify";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_ADD_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_ADD_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "PRODUCT_ADD_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PRODUCT_ADD_RESET":
      return { ...state };
      case "UPLOAD_REQUEST":
        return { ...state, loadingUpload: true, errorUpload: "" };
      case "UPLOAD_SUCCESS":
        return {
          ...state,
          loadingUpload: false,
          errorUpload: "",
        };
      case "UPLOAD_FAIL":
        return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [{ loading, error, loadingUpload }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    product: {},
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [artistName, setArtistName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "PRODUCT_ADD_REQUEST", loading: true });
    try {
      const { data } = await axios.post("/api/products", {
        slug,
        artistName,
        productName,
        description,
        image,
        images,
        price,
        category,
        countInStock,
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({
        type: "PRODUCT_ADD_SUCCESS",
        loading: false,
        payload: data,
      });
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "PRODUCT_ADD_FAIL" });
      
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success("Image uploaded successfully. click Update to apply it");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success("Image removed successfully. click Update to apply it");
  };

  useEffect(() => {
    dispatch({ type: "PRODUCT_ADD_RESET" });
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
              <label htmlFor="image">Image File</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              id="image"
              required
            />
            <label>Upload File</label>
            <label>Upload Image</label>
            <input type="file" onChange={uploadFileHandler} />
            {loadingUpload && <LoadingSpinner />}

            <label>Additional Images</label>
            {images.length === 0 && <p>No image</p>}
              {images.map((x) => (
                <div key={x}>
                  {x}
                  <button onClick={() => deleteFileHandler(x)}>
                    <span>X</span>
                  </button>
                </div>
              ))}
            
            <label>Upload Aditional Image</label>
            <input
              type="file"
              onChange={(e) => uploadFileHandler(e, true)}
            />
            {loadingUpload && <LoadingSpinner />}
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
      )}
    </div>
  );
};

export default AdminAddProduct;