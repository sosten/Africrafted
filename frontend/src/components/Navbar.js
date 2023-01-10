import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import afri_logo from "../assets/images/afri_logo.png";
import { Store } from "../Store";
import style from "../styles/navbar.module.css";
import { FiHeart } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { GrDown } from "react-icons/gr";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const handleSignOut = () => {
    ctxDispatch({ type: "USER_SIGINOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("cartItems");
    window.location.href = "/login";
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className={style.navbar_wrapper}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.afri_logo}>
            <Link to={"/"}>
              <img src={afri_logo} alt="Africraft" className={style.img} />
            </Link>
          </div>
          <div className={style.form_container}>
            <SearchBox />
          </div>
          <div className={style.sign_in}>
            {userInfo ? (
              <div>
                <Link to={"/profile"} className={style.user_name}>
                  Hi, {userInfo.firstName}{" "}
                  <span>
                    <GrDown className={style.angle_down} />
                  </span>
                </Link>
                <ul className={style.user_profile}>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/order_history">Order History</Link>
                  </li>
                  <li onClick={handleSignOut}>
                    <Link to="#">Sign Out</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={"/login"}>Sign in</Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <ul className={style.user_profile}>
                <li>
                  <a href={"/admin/dashboard"}>Dashboard</a>
                </li>
                <li>
                  <Link to={"/admin/products"}>Products</Link>
                </li>
                <li>
                  <Link to={"/admin/orders"}>Orders</Link>
                </li>
                <li>
                  <Link to={"/admin/users"}>Users</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/order_history">Order History</Link>
                </li>
                <li onClick={handleSignOut}>
                  <Link to="#">Sign Out</Link>
                </li>
              </ul>
            )}
          </div>
          <div className={style.svg_heart_icon_container}>
            <FiHeart className={style.heart} />
          </div>
          <div className={style.svg_shopping_cart_icon_container}>
            <Link to="/cart">
              <GiShoppingCart className={style.shopping_cart} />
              {cart.cartItems.length > 0 && (
                <p>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</p>
              )}
            </Link>
          </div>
        </div>
        <div className={style.categories_navbar}>
          {categories.map((category) => (
            <div key={category} className={style.category_navbar}>
              <Link to={`/search?category=${category}`}><span  className={style.link_separator}><span>{category}</span> <span>|</span></span></Link>
            </div>
          ))}
          {/* <Link to={'#'}>Jewerly & Accessories</Link>
            <Link to={'#'}>Clothing & Shoes</Link>
            <Link to={'#'}>Home & Living</Link>
            <Link to={'#'}>Wedding & Party</Link>
            <Link to={'#'}>Toys & Entertainment</Link>
            <Link to={'#'}>Art & Collectibles</Link>
            <Link to={'#'}>Craft Supplies & Tools</Link>
            <Link to={'#'}>Vintage</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
