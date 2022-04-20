import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Categories.module.css';
import decor from '../assets/images/decor_1.webp';

const Categories = () => {
  return (
    <>
        <div className={style.category_container}>
            <div className={style.category_header}>
                <h2>Shop by interest</h2>
                <p>Wall Decor</p>
            </div>
            <div className={style.card_wrapper}>
                <div className={style.card}>
                    <Link to={'#'}>
                        <div className={style.card_img}>
                            <img src={decor} alt="Category" />
                        </div>
                        <div>
                            <p>Painting</p>
                        </div>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to={'#'}>
                        <div className={style.card_img}>
                            <img src={decor} alt="Category" />
                        </div>
                        <div>
                            <p>Music</p>
                        </div>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to={'#'}>
                        <div className={style.card_img}>
                            <img src={decor} alt="Category" />
                        </div>
                        <div>
                            <p>Traveling</p>
                        </div>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to={'#'}>
                        <div className={style.card_img}>
                            <img src={decor} alt="Category" />
                        </div>
                        <div>
                            <p>Craving</p>
                        </div>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to={'#'}>
                        <div className={style.card_img}>
                            <img src={decor} alt="Category" />
                        </div>
                        <div>
                            <p>Mid Centuary Morden</p>
                        </div>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link to={'#'}>
                        <div className={style.card_img}>
                            <img src={decor} alt="Category" />
                        </div>
                        <div>
                            <p>Minimalist</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Categories