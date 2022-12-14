import React, { useEffect, useReducer } from "react";
import axios from "axios";
// import logger from "use-reducer-logger";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import LoadingSpinner from "../components/LoadingSpinner";
// import data from '../data/data';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST", loading: true });
      try {
        const result = await axios.get("/api/products");
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
      // setProducts(result.data)
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", margin: 60, color: '#52442d' }}>
        Shop Art and Cravings here
      </h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default HomeScreen;