import React from "react";
import style from "../styles/AdminAddCategory.module.css";
import SideBar from "../components/SideBar";
import AdminNavbar from "../components/AdminNavbar";
import { useState } from "react";

const AdminAddCategory = () => {
  const [file, setFile] = useState();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  
  return (
    <div className={style.container}>
      <div className={style.left}>
        <SideBar />
      </div>
      <div className={style.top}>
        <AdminNavbar />
        <div className={style.form_container}>
          <form>
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
            <input type="text" id="name" placeholder="Category name" />
            <input type="submit" value="Create Category" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategory;