import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Register.module.css';

const Register = () => {
  return (
    <>
        <div className={style.containter}>
            <div className={style.form_container}>
                <div className={style.form_cont}>
                    <div className={style.form_header}>
                        <h1>Create an account</h1>
                        <p>Africraft is here for you</p>
                    </div>
                    <form>
                        <div className={style.names_container}>
                            <div className={style.f_name}>
                                <label htmlFor="fname">First Name</label>
                                <input type="text" placeholder='First name' id='fname' />
                            </div>
                            <div className={style.l_name}>
                                <label htmlFor="lname">Last Name</label>
                                <input type="text" placeholder='Last name' id='lname' />
                            </div>
                        </div>
                        <label htmlFor="email">Email address</label>
                        <input type="text" placeholder='Email address' id='email' />
                        <label htmlFor="pwd">Password</label>
                        <input type="password" placeholder='Password' id='pwd' />
                        <input type="submit" value="Register" />
                        <div className={style.account}>
                            <Link to="/login">Already have an account? Sign in</Link>
                        </div>
                            <div className={style.comment}>
                            <p>By Registering you agree to Africraft <Link to={'#'}>Terms of Use</Link> and <Link to={'#'}>Privacy policy</Link></p>
                        </div>
                        <p className={style.copyright}><Link to={'/'}>{'\u00a9'}2022 Africrafted</Link></p>
                    </form> 
                </div>            
            </div>
        </div>
    </>
  )
}

export default Register