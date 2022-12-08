import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { Store } from "../Store";
import style from "../styles/Register.module.css";

const RegisterScreen = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password did not match");
      return;
    }

    try {
      const { data } = await Axios.post('/api/user', {
        firstName,
        lastName,
        email,
        password
      });

      console.log(data);

      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      console.log(error);
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
            <h1>Create an account</h1>
            <p>Africraft is here for you</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.names_container}>
              <div className={style.f_name}>
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  id="fname"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={style.l_name}>
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  id="lname"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              placeholder="Email address"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="pwd"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confrim_pwd">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confrim_pwd"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input type="submit" value="Register" />
            <div className={style.account}>
              <Link to={`/login?redirect=${redirect}`}>
                Already have an account? Sign in
              </Link>
            </div>
            <div className={style.comment}>
              <p>
                By Registering you agree to Africrafted{" "}
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

export default RegisterScreen;
