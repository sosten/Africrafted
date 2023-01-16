import style from "../styles/ProductDetail.module.css";
import { BsCheck2 } from "react-icons/bs";
// import { BsHeart } from "react-icons/bs";
import Rating from "../components/Rating";
// import Product from '../components/Product';
// import data from '../data/data';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import logger from "use-reducer-logger";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import LoadingSpinner from "../components/LoadingSpinner";
// import Zoom from 'react-img-zoom';

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductDetailsScreen = () => {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/product/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry: this product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      alert("Please enter comment and rating");
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.firstName },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "CREATE_SUCCESS",
      });
      alert("Review submitted successfully");
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: "REFRESH_PRODUCT", payload: product });
      window.scrollTo({
        behavior: "smooth",
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      alert(error);
      dispatch({ type: "CREATE_FAIL" });
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style.container}>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className={style.product_wrapper}>
            <div className={style.img_cover}>
                {/* <div className={style.zoom_image}>
              
                <Zoom
                  img={selectedImage || product.image}
                  zoomScale={3}
                  width={400}
                  height={400}
                  
                />
              </div> */}
                <img
                  src={selectedImage || product.image}
                  alt={product.productName}
                /> 
              
              <div className={style.thumbnails}>
                {[product.image, ...product.images].map((x) => (
                  <div key={x}>
                    <button
                      className={style.thumbnail_btn}
                      onClick={() => setSelectedImage(x)}
                    >
                      <img src={x} alt="product" />
                    </button>
                  </div>
                ))}
                
              </div>

              <div className={style.reviews}>
                <div>
                <h2 ref={reviewsRef}>Reviews</h2>
                  {product.reviews.map((review) => (
                    <div key={review._id}>
                      {/* <strong>{review.name}</strong> */}
                      {product.reviews.length === 0 && <p>There is no review</p>}
                      <Rating rating={review.rating} caption=" "></Rating>
                      <p>{review.comment}</p>
                      <p className={style.review_name}>{review.name} {review.createdAt.substring(0, 10)}</p>
                      <br />
                    </div>
                  ))}
                </div>
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <h2>Write a customer review</h2>
                      <div>
                        <label htmlFor="rating">Rating</label>
                        <select
                          id="rating"
                          aria-label="Rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very good</option>
                          <option value="5">5- Excellent</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="textarea">Review</label>
                        <textarea id="textarea" placeholder="Leave a comment here" rows={4} onChange={(e) => setComment(e.target.value)}></textarea>
                      </div>
                      <div>
                        <button disabled={loadingCreateReview} type="submit">
                          Submit
                        </button>
                        {loadingCreateReview && <LoadingSpinner></LoadingSpinner>}
                      </div>
                    </form>
                  ) : (
                    <p>
                      Please{" "}
                      <Link to={`/login?redirect=/product/${product.slug}`}>
                        Sign In
                      </Link>{" "}
                      to write a review
                    </p>
                  )}
                </div>
              </div>
              {/* <div className={style.heart}>
                <BsHeart size={24} />
              </div>  */}
              <div className={style.product_description}>
                <div className={style.artist}>
                  <h2>{product.productName}</h2>
                {/* <div className="my-3">
                  <h2 ref={reviewsRef}>Reviews</h2>
                  <div className="mb-3">
                    {product.reviews.length === 0 && <p>There is no review</p>}
                  </div>
                </div> */}
                
              </div>
              <p className={style.description}>{product.description}</p>
              <p className={style.price}>
                <b>${product.price}</b>{" "}
                {product.countInStock > 0 ? (
                  <span>
                    <BsCheck2 />
                    <small>In stock</small>
                  </span>
                ) : (
                  <span>Unavailable</span>
                )}
              </p>
              <p className={style.tax}>
                Local taxes included (where applicable)
              </p>
              {/* <p className={style.size}>Size: 29” X 11” X 3”</p> */}
              {product.countInStock > 0 && (
                <button onClick={addToCartHandler}>Add to Cart</button>
              )}
            </div> 
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsScreen;
