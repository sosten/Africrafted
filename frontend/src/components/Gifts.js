import React from 'react';
import style from '../styles/gifts.module.css';
import afri_logo from '../assets/images/bres_1.jpg';
import fabric_1 from '../assets/images/fab_1.jpg';
import wood_1 from '../assets/images/wood_1.webp';
import bag_1 from '../assets/images/bag_1.webp';
import jewelry_5 from '../assets/images/jewelry_5.jpg';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const Gifts = () => {
  return (
    <>
        <div className={style.container}>
            <div className={style.header}>
                <h1>Most popular products</h1>
            </div>
            <div className={style.card_container}>
                <div className={style.card}>
                    <Link to="/product_detail">
                        <img src={afri_logo} alt="category" className={style.img} />
                        <h3>Zambian beaded tribal bracelets/bangles</h3>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <p>$50</p>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to="/all_products">
                        <img src={wood_1} alt="category" className={style.img} />
                        <h3>Zambian  Wooden Fruit Bowl</h3>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <p>$150.99</p>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to="#">
                        <img src={fabric_1} alt="fabrick" className={style.img} />
                        <h3>Zambian fabric floor mat</h3>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <p>$50</p>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to="#">
                        <img src={bag_1} alt="category" className={style.img} />
                        <h3>Brown Tote Hand Bag</h3>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <p>$50</p>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to="#">
                        <img src={jewelry_5} alt="category" className={style.img} />
                        <h3>Zambian Jewelry</h3>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <AiFillStar color='#444'/>
                        <p>$540</p>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Gifts