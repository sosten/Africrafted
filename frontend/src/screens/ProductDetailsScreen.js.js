import style from "../styles/ProductDetail.module.css";
import { BsCheck2 } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import Rating from '../components/Rating';
// import Product from '../components/Product';
// import data from '../data/data';
import logger from "use-reducer-logger";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductDetailsScreen = () => {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST", loading: true });
      try {
        const result = await axios.get(`/api/product/${slug}`);
        dispatch({
          type: "FETCH_SUCCESS",
          loading: false,
          payload: result.data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          loading: false,
          payload: error.message,
        });
      }
    };
    fetchData();
  }, [slug]);

  const {state, dispatch: ctxDispatch} = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async() => {
    const existItem = cart.cartItems.find((x)=>x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < quantity){
      window.alert('Sorry: this product is out of stock');
      return;
    }
    ctxDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}});
  }

  return (
    <div className={style.container}>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className={style.product_wrapper}>
          <div className={style.img_cover}>
            <img src={product.image} alt={product.productName} />
          </div>
          <div className={style.heart}>
            <BsHeart size={24} />
          </div>
          <div className={style.product_description}>
            <div className={style.artist}>
              <h2>{product.productName}</h2>
              <p>
                {<Rating rating={product.rating} numReviews={product.numReviews} />}
              </p>
            </div>
            <p className={style.description}>
              {product.description}
            </p>
            <p className={style.price}>
              <b>${product.price}</b>{" "}
              {
                product.countInStock > 0 ?  (<span>
                <BsCheck2 />
                <small>In stock</small>
              </span>) : (<div>Unavailable</div>)
              
              
                }
            </p>
            <p className={style.tax}>Local taxes included (where applicable)</p>
            <p className={style.size}>Size: 29” X 11” X 3”</p>
            {
              product.countInStock > 0 && (
                <button onClick={addToCartHandler}>Add to Cart</button>
              )
            }
          </div>
        </div>
      )}
      <div className={style.row}>
        <div className={style.similar_header}>
          <h2>Similar products</h2>
        </div>
        {/* <Product /> */}
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
