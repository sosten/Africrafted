import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Store } from "../Store";
import style from "../styles/Login.module.css";
import { HiOutlineUser } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/signin", {
        email,
        password,
      });

      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");

      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Invalied email or password");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <div className={style.containter}>
      <div className={style.form_container}>
        <div className={style.form_cont}>
          <div className={style.form_header}>
            <div className={style.user_icon}>
              <HiOutlineUser size={24} />
            </div>
            <h1>Sign in</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email address <span>*</span>
            </label>
            <input
              type="email"
              placeholder="Email address"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pwd">
              Password <span>*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              id="pwd"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={style.stay_signed}>
              <input type="checkbox" name="" id="sign" />
              <label htmlFor="sign">Stay signed in</label>
            </div>
            <input type="submit" value="Sign in" />
            <div className={style.account}>
              <Link to="#">Forgot your password?</Link>
              <Link to={`/register?redirect=${redirect}`}>
                Don't have an account? Sign up
              </Link>
            </div>
            <div className={style.comment}>
              <p>
                By sigining in you agree to Africraft{" "}
                <Link to={"#"}>Terms of Use</Link> and{" "}
                <Link to={"#"}>Privacy policy</Link>
              </p>
            </div>
            <p className={style.copyright}>
              <Link to={"/"}>{"\u00a9"}2022 Africrafted</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;