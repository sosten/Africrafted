import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BunnerForCategories from './BunnerForCategories';
import style from '../styles/home.module.css';
import Gifts from './Gifts';
// import { ShopSelection } from './ShopSelection';
// import Sculputures from './Sculputures';
import Footer from './Footer';
import { GiCeremonialMask } from "react-icons/gi";
import { GiHeartNecklace } from "react-icons/gi";
import { GiNecklaceDisplay } from "react-icons/gi";
import { IoIosBasket } from "react-icons/io";

const Home = () => {
  return (
    <>
      <Navbar />
      <BunnerForCategories />
      <div className={style.container}>
        <Gifts />
        {/* <ShopSelection />
        <Sculputures />
        <hr /> */}
        <div className={style.supplier}>
          <div className={style.supplier_bg}>
            <div className={style.supplier_cont}>
              <h3><strong>Africrafted</strong> from africa to the world, here we have <b>African Craft, Painting</b> and <b>Hand Carved Arts.</b> </h3>
              <p>If you are a supplier of any African arts and Crafts products, anything African <Link to={'/suppliers'}>click here</Link> </p>
            </div>
          </div>
        </div>
        
        <div className={style.advert_container}>
          <div className={style.header}>
            <h1>For a small taste of what Africrafted offers take a look at several of their collections.</h1>
          </div>
          <div className={style.advert_card}>
            <div className={style.advert_card_cont}>
              <GiHeartNecklace className={style.icon} />
              <p><b>The African Jewelry collection</b> features vintage necklaces, bracelets, rings, earrings, and pendants.</p>
            </div>
            <div className={style.advert_card_cont}>
              <GiCeremonialMask className={style.icon} />
              <p><b>The African Masks category</b> offers human and animal masks, collectible dance masks, headdresses, vintage passport masks, famed helmet masks and Janus masks.</p>
            </div>
            <div className={style.advert_card_cont}>
              <GiNecklaceDisplay className={style.icon}/>
              <p><b>In the African Carving collection</b>, elaborate figural wood carvings of countless African cultures and artists are offered in every size and shape.</p>
            </div>
            <div className={style.advert_card_cont}>
              <IoIosBasket className={style.icon}/>
              <p><b>African baskets</b> include antique Tutsi tight-weaves, vintage Zulu beer baskets, flat Tonga Binga winnowing baskets and many more collectable hand-woven African baskets, containers and vessels.</p>
            </div>
          </div>
        </div>                       
      </div>
       <Footer />
    </>
  )
}

export default Home;