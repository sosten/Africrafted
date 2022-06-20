import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BunnerForCategories from './BunnerForCategories';
import style from '../styles/home.module.css';
import Gifts from './Gifts';
import { ShopSelection } from './ShopSelection';
import Sculputures from './Sculputures';
import Footer from './Footer';
import decor from '../assets/images/art_5.jpg';
import people from '../assets/images/mask.jpg';
import dance from '../assets/images/carved_3.jpg';

const Home = () => {
  return (
    <>
      <Navbar />
      <BunnerForCategories />
      <div className={style.container}>
        <Gifts />
        <ShopSelection />
        <Sculputures />
        <div className={style.supplier}>
          <div className={style.supplier_bg}>
            <div className={style.supplier_cont}>
              <h3><strong>AFRICRAFTED</strong> FROM AFRICA TO THE WORLD, HERE WE HAVE AFRICAN CRAFTS, PAINTINGS AND HAND CARVED ARTS</h3>
              <p>If you are a supplier of any African arts and Crafts products, anything African <Link to={'/suppliers'}>click here</Link> </p>
            </div>
            <div className={style.supplier_images}>
              <img src={decor} alt="Wall Decor" />
              <img src={people} alt="people" />
              <img src={dance} alt="dance" />
            </div>
          </div>
        </div>                       
      </div>
      {/*
        <div className={style.contact_form}>
          <div className={style.contact_header}>
            <h2>Contact Us</h2>
            <p>Email 'AFRICRAFTED' for questions, queries or comments at <a href="mailto:africrated@gmail.com">africrated@gmail</a></p>
          </div>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <label htmlFor="msg">Message</label>
            <textarea id="msg" cols="10" rows="4"></textarea>
            <input type="submit" value="Send" />
          </form>
        </div>
         */}
       <Footer />
    </>
  )
}

export default Home;