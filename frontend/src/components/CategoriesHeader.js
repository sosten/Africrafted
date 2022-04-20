import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import decor from '../assets/images/decor_1.webp';
import style from '../styles/CategoriesHeader.module.css';

const CategoriesHeader = () => {
  return (
    <>
        <div className={style.header_container}>
            <div className={style.header}>
                <h1>Wall Decor</h1>
                <div className={style.header_cont}>
                    <div className={style.header_links}>
                        <Link to={'#'}>All <FaAngleRight /></Link>
                        <Link to={'#'}>Home & Living <FaAngleRight /></Link>
                        <Link to={'#'}>Home Decor</Link>
                        <p>Wall Decor</p>
                        <p>(74563 Results)</p>
                    </div>
                    <div className={style.header_category}>
                        <div className={style.img_container}>
                            <img src={decor} alt="Category" />
                            <Link to={'#'}>Wallpaper</Link>
                        </div>
                        <div className={style.img_container}>
                            <img src={decor} alt="Category" />
                            <Link to={'#'}>Wall Stencils</Link>
                        </div>
                        <div className={style.img_container}>
                            <img src={decor} alt="Category" />
                            <Link to={'#'}>Wall Decors</Link>
                        </div>
                        <div className={style.img_container}>
                            <img src={decor} alt="Category" />
                            <Link to={'#'}>Wall Hangings</Link>
                        </div>
                        <div className={style.img_container}>
                            <img src={decor} alt="Category" />
                            <Link to={'#'}>Wall Decals & Murals</Link>
                        </div>
                        <div className={style.img_container}>
                            <img src={decor} alt="Category" />
                            <Link to={'#'}>Wall Stencils</Link>
                        </div>
                        <div className={style.img_container}>
                            <img src={decor} alt="Category" />
                            <Link to={'#'}>Wall Decors</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CategoriesHeader