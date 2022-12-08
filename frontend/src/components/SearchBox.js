import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import style from "../styles/SearchBox.module.css";

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <div className={style.container}>
      <form onSubmit={submitHandler}>
        <div className={style.form_content}>
          <div className={style.form_label}>
            <label htmlFor="q"></label>
            <input
              type="text"
              name="q"
              id="q"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              aria-describedby="button-search"
            />
          </div>
          <div className={style.form_btn}>
            <button type="submit" id="button-search">
              <FiSearch className={style.search_icon} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;