import { Link } from "react-router-dom";
import { TiPencil } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";
import AdminNavbar from "../components/AdminNavbar";
import SideBar from "../components/SideBar";
import LoadingSpinner from "../components/LoadingSpinner";
import style from "../styles/AdminCategories.module.css";
import { useReducer, useEffect } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_FETCH_REQUEST":
      return { ...state, loading: true };
    case "CATEGORY_FETCH_SUCCESS":
      return { ...state, loading: false, category: action.payload };
    case "CATEGORY_FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AddminCategories = () => {
  const [{ loading, error, category }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    category: [],
  });

  useEffect(() => {
    const fetchCategory = async () => {
      dispatch({ type: "CATEGORY_FETCH_REQUEST", loading: false });
      try {
        const result = await axios.get("/api/product_categories");
        dispatch({
          type: "CATEGORY_FETCH_SUCCESS",
          loading: false,
          payload: result.data,
        });
      } catch (error) {
        dispatch({ type: "CATEGORY_FETCH_FAIL" });
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className={style.container}>
          <div className={style.left}>
            <SideBar />
          </div>
          <div className={style.top}>
            <AdminNavbar />
            <div className={style.table_container}>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((category) => (
                    <tr key={category._id}>
                      <td>{category.category}</td>
                      <td className={style.action}>
                        <p className={style.edit} title="Edit Category">
                          <TiPencil className={style.edit_icon} />
                        </p>
                        <p className={style.delete} title="Delete Category">
                          <FiTrash2 className={style.delete_icon} />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link to="/admin/add_category">Create Category</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddminCategories;