import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, carvings: action.payload };
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const CarvingsAndPaintings = () => {
  const [{ error, loading, carvings }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    carvings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await Axios.get(`/api/carving`);
        dispatch({ type: "FETCH_SUCCESS", loading: false, payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Navbar />
          <div className="container">
            <h1>Carvings & Sculptures</h1>
            {carvings.map((carving) => (
              <Product key={carvings._id} product={carving} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CarvingsAndPaintings;
