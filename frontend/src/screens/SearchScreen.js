import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import Product from "../components/Product";
import style from "../styles/SearchScreen.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { RiEqualizerLine } from "react-icons/ri";
import beads from "../assets/images/beads-image.png";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: "4",
  },
  {
    name: "3stars & up",
    rating: "3",
  },
  {
    name: "2stars & up",
    rating: "2",
  },
  {
    name: "1stars & up",
    rating: "1",
  },
];

const SearchScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); //search?category=beads
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, countProducts, pages }, dispatch] =
    useReducer(reducer, {
      error: "",
      loading: true,
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fetchData();
  }, [page, query, category, price, rating, order, error]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <div className={style.top_nav}>
          <li><Link to="/">Home</Link> &#10093;</li>
          <li>Shop</li>
        </div>
        <div className={style.header_bg}>
          <div className={style.header_cont}>
            <div className={style.title}>
              <h1>Shop African Art & Crafts</h1>
              <p>Africrafted is best known for its authentic and unique African art work.</p>
            </div>
            <div className={style.image}>
              <img src={beads} alt="beads" />
            </div> 
          </div>
        </div>
        <div className={style.wrapper}>
          <div className={style.side_bar}>
            <h3>Department</h3>
            <li>
              <Link to={getFilterUrl({ category: "all" })}>Any</Link>
            </li>
              {categories.map((c) => (
            <li key={c}>
              <Link to={getFilterUrl({ category: c })}>{c}</Link>
            </li>
            ))}
            <h3>Price</h3>
            <li>
              <Link to={getFilterUrl({ price: "all" })}>Any</Link>
            </li>
              {prices.map((p) => (
            <li key={p.value}>
              <Link to={getFilterUrl({ price: p.value })}>{p.name}</Link>
            </li>
            ))}
            
            <h3>Avarage Customer Reviews</h3>
          
            {ratings.map((r) => (
            <li key={r.name}>
              <Link to={getFilterUrl({ rating: r.rating })}>
                <Rating caption={" & up"} rating={r.rating}></Rating>
              </Link>
            </li>
            ))}
            <li>
              <Link to={getFilterUrl({ rating: "all" })}>
                <Rating caption={" & up"} rating={0}></Rating>
              </Link>
            </li>
          </div>  
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div>{error}</div>
          ) : (
          <div className={style.content}>
            <div className={style.sort}>
              <h3><RiEqualizerLine /> Sort By</h3>
              <select
                value={order}
                onChange={(e) =>
                  navigate(getFilterUrl({ order: e.target.value }))
                }
              >
                <option value="newest">Newest Arrival</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low </option>
                <option value="toprated">Avg Customer Reviews</option>
              </select>
            
              <div className={style.result_cont}>
                <span className={style.result}> {countProducts === 0 ? "No" : countProducts} Result(s)
                  {query !== "all" && ":" + query}
                  {category !== "all" && ":" + category}
                  {price !== "all" && ": Price" + price}
                  {rating !== "all" && ": Rating" + rating + "& up"}
                  {query !== "all" ||
                  category !== "all" ||
                  price !== "all" ||
                  rating !== "all" ? (
                    <button onClick={() => navigate("/search")}>X</button>
                  ) : null}</span>
              </div>
            </div>
            <div className={style.products}>
              <div>{products.length === 0 && <div>Products Not Found</div>}</div>
                {products.map((product) => (
                  <div key={product._id}>
                    <Product product={product}></Product>
                  </div>
                ))}
            </div>
          </div>
          )}
        </div>
        <div className={style.btn}>
            {[...Array(pages).keys()].map((x) => (
            <Link key={x + 1} to={getFilterUrl({ page: x + 1 })}>
              <button className={Number(page) === x + 1 ? "text-bold" : ""}>
                {x + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
    <Footer />
  </div>
  );
};

export default SearchScreen;