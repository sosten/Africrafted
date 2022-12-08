import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavbar from "../components/AdminNavbar";
import LoadingSpinner from "../components/LoadingSpinner";
import SideBar from "../components/SideBar";
import { Store } from "../Store";
import { getError } from "../utils";
import style from "../styles/UserEditScreen.module.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function UserEditScreen() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.firstName);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, firstName, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  return (
    <div className={style.edit_container}>
      <div className={style.sider_bar}>
        <SideBar />
      </div>
      <div className={style.top_navbar}>
        <AdminNavbar />
        

      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={style.form_container}>
        <h1>Edit User: {userId}</h1>
        <form onSubmit={submitHandler}>
          
            <label htmFor="name">Name</label>
            <input
            type={"text"}
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              id="name"
              required
            />

            <label htmFor="email">Email</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          <input
            type="checkbox"
            id="isAdmin"
            label="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <span> Is Admin</span>
            <button disabled={loadingUpdate} type="submit">
              Update
            </button>
            {loadingUpdate && <LoadingSpinner></LoadingSpinner>}
        </form>
        </div>
      )}
    </div>
    </div>
  );
}
