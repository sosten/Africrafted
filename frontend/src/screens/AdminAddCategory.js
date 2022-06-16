import React from "react";
import style from "../styles/AdminAddCategory.module.css";
import SideBar from "../components/SideBar";
import AdminNavbar from "../components/AdminNavbar";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CATEGORY_REQUEST":
      return { ...state, loading: true };
    case "ADD_CATEGORY_SUCCESS":
      return { ...state, loading: false, category: action.payload };
    case "ADD_CATEGORY_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AdminAddCategory = () => {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    category: "",
  });

  const [file, setFile] = useState();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_CATEGORY_REQUEST", loading: true });
    try {
      const { data } = await axios.post("/api/category", { category });
      dispatch({ type: "ADD_CATEGORY_SUCCESS", loading: false, payload: data });
    } catch (error) {
      dispatch({ type: "ADD_CATEGORY_FAIL" });
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
        <div className={style.form_container}>
          <form onSubmit={handleSubmit}>
            <div className={style.header}>
              <Link to={"/admin/categories"} className={style.link}>
                <span>
                  <BsArrowLeft className={style.icon} />
                </span>
                <span className={style.view}>View all</span>
              </Link>
              <h1>Add Category</h1>
            </div>

            <img
              src={file ? URL.createObjectURL(file) : "/images/placeholder.png"}
              alt="No"
            />
            <label htmlFor="file">
              <span className={style.file}> Add Image </span>
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category name"
            />
            <input type="submit" value="Create Category" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategory;