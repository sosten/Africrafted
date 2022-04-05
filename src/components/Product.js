import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Product.module.css';
import { AiFillStar }  from 'react-icons/ai';
import decor from '../assets/images/decor_1.webp';

const Product = () => {
  return (
    <>
        <div className={style.container}>
            <div className={style.card_wrapper}>
                <Link to={'#'}>
                    <div className={style.card}>
                        <img src={decor} alt="Product" />
                        <div className={style.card_content}>
                            <p className={style.description}>Description</p>
                            <p className={style.rating}>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <span>(1,234)</span>
                            </p>
                            <p className={style.price}>K3452.00</p>
                            <p className={style.artist}>Ad by ArtonlineGallery</p>
                        </div>
                    </div>
                </Link>
                <Link to={'#'}>
                    <div className={style.card}>
                        <img src={decor} alt="Product" />
                        <div className={style.card_content}>
                            <p className={style.description}>Description</p>
                            <p className={style.rating}>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <span>(1,234)</span>
                            </p>
                            <p className={style.price}>K3452.00</p>
                            <p className={style.artist}>Ad by ArtonlineGallery</p>
                        </div>
                    </div>
                </Link>
                <Link to={'#'}>
                    <div className={style.card}>
                        <img src={decor} alt="Product" />
                        <div className={style.card_content}>
                            <p className={style.description}>Description</p>
                            <p className={style.rating}>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <span>(1,234)</span>
                            </p>
                            <p className={style.price}>K3452.00</p>
                            <p className={style.artist}>Ad by ArtonlineGallery</p>
                        </div>
                    </div>
                </Link>
                <Link to={'#'}>
                    <div className={style.card}>
                        <img src={decor} alt="Product" />
                        <div className={style.card_content}>
                            <p className={style.description}>Description</p>
                            <p className={style.rating}>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <span>(1,234)</span>
                            </p>
                            <p className={style.price}>K3452.00</p>
                            <p className={style.artist}>Ad by ArtonlineGallery</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Product