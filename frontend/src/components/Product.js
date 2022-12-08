import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Store";
import axios from "axios";
import Rating from "./Rating";
import style from "../styles/Product.module.css";
// import data from '../data/data';
import { AiOutlineShopping } from "react-icons/ai";

const Product = (props) => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry: this product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <div className={style.container}>
      <div className={style.card_wrapper}>
        <div className={style.card}>
          <Link to={`/product/${product.slug}`} title="Click to view details">
            <img src={product.image} alt={product.name} />
          </Link>
          <div className={style.card_content}>
            <div className={style.left_cont}>
              <Link to={`/product/${product.slug}`} title="Click to view details">
                <p className={style.description}>{product.name}</p>
                <p className={style.rating}>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </p>
                <p>{product.productName}</p>
                <p className={style.artist}>
                  <b>Artist:</b> {product.artistName}
                </p>
                <p className={style.price}>
                  <b>${product.price}</b>
                </p>
              </Link>
            </div>
            <div className={style.right_cont}>
              { product.countInStock === 0 ? ( 
                  <AiOutlineShopping
                  className={style.shopping_bag_disabled}
                  title={"Out of Stock"}
                /> 
                ):(
                <AiOutlineShopping
                  className={style.shopping_bag}
                  title={"Add to cart"}
                  onClick={() => addToCartHandler(product)}
                />
                )
              }
            </div>
          </div>
        </div>
        {/* {product.countInStock === 0 ? (
          <button className={style.disabled_btn} disabled>
            Out of stock
          </button>
        ) : (
          <button
            className={style.active_btn}
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </button>
        )} */}
      </div>
  </div>
  );
};

export default Product;
