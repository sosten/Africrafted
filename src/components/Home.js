import React from 'react';
// import Navbar from './Navbar';
import BunnerForCategories from './BunnerForCategories';
import style from '../styles/home.module.css';
import Gifts from './Gifts';
import { ShopSelection } from './ShopSelection';
import Sculputures from './Sculputures';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <BunnerForCategories />
      <div className={style.container}>
        <Gifts />
        <ShopSelection />
        <Sculputures />
      </div>
       <Footer />
    </>
  )
}

export default Home