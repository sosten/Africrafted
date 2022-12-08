import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Login.module.css';
import { HiOutlineUser } from 'react-icons/hi';

const Login = () => {
  return (
    <>
        <div className={style.containter}>
            <div className={style.form_container}>
                <div className={style.form_cont}>
                    <div className={style.form_header}>
                        <p className={style.user_icon}>
                            <HiOutlineUser size={24} />
                        </p>
                        <h1>Sign in</h1>
                    </div>
                    <form>
                        <label htmlFor="email">Email address <span>*</span></label>
                        <input type="text" placeholder='Email address' id='email' />
                        <label htmlFor="pwd">Password</label>
                        <input type="password" placeholder='Password' id='pwd' />
                        <div className={style.stay_signed}>
                            <input type="checkbox" name="" id="sign" />
                            <label htmlFor="sign">Stay signed in</label>
                        </div>
                        <input type="submit" value="Sign in" />
                        <div className={style.account}>
                            <Link to="#">Forgot your password?</Link>
                            <Link to="/register">Don't have an account? Sign up</Link>
                        </div>
                            <div className={style.comment}>
                            <p>By sigining in you agree to Africraft <Link to={'#'}>Terms of Use</Link> and <Link to={'#'}>Privacy policy</Link></p>
                        </div>
                        <p className={style.copyright}><Link to={'/'}>{'\u00a9'}2022 Africrafted</Link></p>
                    </form> 
                </div>            
            </div>
        </div>
    </>
  )
}

export default Login