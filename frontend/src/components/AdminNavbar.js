import React from "react";
import { Link } from "react-router-dom";
import { BsGlobe } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { BsChatLeft } from "react-icons/bs";
import style from "../styles/AdminNavbar.module.css";
import { useContext } from "react";
import { Store } from "../Store";

const AdminNavbar = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <div className={style.navbar_container}>
      <div className={style.search}>
        <form>
          <div className={style.search_cont}>
            <input type="text" placeholder="Search" />
            <button type="Submit">
              <BsSearch className={style.icon} />
            </button>
          </div>
        </form>
      </div>
      <div className={style.top_links}>
        <ul>
          <li>
            <Link to="#">
              <BsGlobe className={style.icon} /> English
            </Link>
          </li>
          <li>
            <Link to="#">
              <BsMoon className={style.icon} />
            </Link>
          </li>
          <li className={style.counter_wrapper}>
            <Link to="#">
              <BsBell className={style.icon} />
              <span className={style.counter}>
                <span className={style.counter_cont}>1</span>
              </span>
            </Link>
          </li>
          <li className={style.counter_wrapper}>
            <Link to="#">
              <BsChatLeft className={style.icon} />
              <span className={style.counter}>
                <span className={style.counter_cont}>2</span>
              </span>
            </Link>
          </li>
          <li className={style.avator}>
            Admin {userInfo.firstName}
            <img src="/images/art_5.jpg" alt="Avator" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
