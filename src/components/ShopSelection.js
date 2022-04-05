import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/shopSelection.module.css';
import art_1 from '../assets/images/art_1.jpg';
import art_5 from '../assets/images/art_5.jpg';
import oil_art from '../assets/images/oil_art.jpg'
import oil_art_1 from '../assets/images/oil_art_1.jpg';

export const ShopSelection = () => {
  return (
    <>
        <div className={style.header}>
            <h1><Link to={'/shopping_cart'}>Art & Painting </Link></h1>
            <p>Curated collections hand-picked by Africraft editors</p>
        </div>
        <div className={style.card_container}>
            <div className={style.card}>
                <Link to={'#'}>
                    <div className={style.card_img_wrapper}>
                        <img src={oil_art} alt="Art and craft" className={style.img} />
                        <h3>Oil Painting celebartion</h3>
                    </div>
                </Link>
            </div>
            <div className={style.card}>
                <Link to={'#'}>
                    <div className={style.card_img_wrapper}>
                        <img src={art_1} alt="Art and craft" className={style.img} />
                        <h3>Oil Art paint</h3>
                    </div>
                </Link>
            </div>
            <div className={style.card}>
                <Link to={'#'}>
                    <div className={style.card_img_wrapper}>
                        <img src={oil_art_1} alt="Art and craft" className={style.img} />
                        <h3>Zambian Oil painting a girl smiling</h3>
                    </div>
                </Link>
            </div>
            <div className={style.card}>
                <Link to={'#'}>
                    <div className={style.card_img_wrapper}>
                        <img src={art_5} alt="Art and craft" className={style.img} />
                        <h3>Oil Art paint</h3>
                    </div>
                </Link>
            </div>
            <div className={style.card}>
                <Link to={'#'}>
                    <div className={style.card_img_wrapper}>
                        <img src={art_1} alt="Art and craft" className={style.img} />
                        <h3>Oil Art paint</h3>
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}
