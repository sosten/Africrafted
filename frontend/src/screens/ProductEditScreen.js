import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import SideBar from "../components/SideBar";
import AdminNavbar from "../components/AdminNavbar";
import LoadingSpinner from "../components/LoadingSpinner";
import style from "../styles/ProductEditScreen.module.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
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
export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [artistName, setArtistName] = useState("");
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        setArtistName(data.artistName);
        setProductName(data.productName);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);

        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          artistName,
          productName,
          slug,
          price,
          image,
          images,
          category,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
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

  return (
    <div className={style.edit_container}>
      <div className={style.sidbar}>
        <SideBar />
      </div>
      <div className={style.top_navbar}>
        <AdminNavbar />
        
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={style.form_container}>
        <h1>Edit Product: {productId}</h1>
        <form onSubmit={submitHandler}>
            <label htmlFor="artname">Artist Name</label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              id="artname"
              required
            />
          
            <label htmlFor="pname">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              id="pname"
              required
            />
            <label htmlFor="slug">Slug</label>
            <input
              type={"text"}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              id="slug"
              required
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              required
            />
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
          
            <label>Category</label>
            <input
              type={"text"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          
            <label>Count In Stock</label>
            <input
              type={"number"}
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
  
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <button disabled={loadingUpdate} type="submit">
              Update
            </button>
            {loadingUpdate && <LoadingSpinner />}
         
        </form>
        </div>
      )}
    </div>
    </div>
  );
}
