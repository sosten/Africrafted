import React from "react";
import { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { rows, columns } from "../data/productData";
import EllipsisText from "react-ellipsis-text";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { TiPencil } from "react-icons/ti";
import AdminNavbar from "../components/AdminNavbar";
import SideBar from "../components/SideBar";
import LoadingSpinner from "../components/LoadingSpinner";
import style from "../styles/AdminProductTable.module.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loading: false };
    case "DELETE_SUCCESS":
      return { ...state, loading: false };
    case "DELETE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const AdminProductsTable = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST", loading: true });
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: () => {
        return (
          <div className={style.cell_action}>
            <div className={style.view_btn}>Edit</div>
            <div className={style.delete_btn}>Delete</div>
          </div>
        );
      },
    },
  ];

  const deleteHandler = (id) => {
    dispatch({ type: "DELETE_REQUEST", loading: false });
    window.confirm("Are you sure you want to delete this product?");
    axios.delete(`/api/products/${id}`);
    dispatch({ type: "DELETE_SUCCESS", loading: false });
  };

  return (
    <div>
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
            <div className={style.table}>
              <div style={{ width: "100%" }}>
                <div className={style.header}>
                  <h1>Products</h1>
                  <p>Total: {products.length}</p>
                  <div className={style.add_btn}>
                    <Link to={"/admin/add_product"}>Add New</Link>
                  </div>
                </div>
                <div className={style.card_wrapper}>
                  {products.map((product) => (
                    <div key={product._id} className={style.card_container}>
                      <div className={style.card}>
                        {<img src={product.image} alt={product.productName} />}
                        <div className={style.card_details}>
                          <p className="pname">
                            <b>Name:</b> {product.productName}
                          </p>
                          <p className="price">
                            <b> Price: ${product.price}</b>
                          </p>
                          <p className="category">
                            <b>Category:</b> {product.category}
                          </p>
                          {/* <p>Description: <EllipsisText text={product.description} length={"50"} className="description"/></p> */}
                          <p className="count">
                            <b>Count In Stock:</b>
                            {product.countInstock === 0 ? (
                              <span className={style.out_of_stock}>
                                Out of stock
                              </span>
                            ) : (
                              <span className={style.in_stock}> In stock</span>
                            )}
                          </p>
                          <div className={style.action}>
                            <p
                              title="Delete Product"
                              onClick={() => deleteHandler(product._id)}
                            >
                              <FiTrash2 className={style.delete_icon} />
                            </p>
                            <p title="Edit Product">
                              <Link to={`/admin/edit_product/${product._id}`}>
                                <TiPencil className={style.edit_icon} />
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <DataGrid
                  rows={rows}
                  columns={columns.concat(actionColumn)}
                  pageSize={7}
                  rowsPerPageOptions={[7]}
                  checkboxSelection
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsTable;
