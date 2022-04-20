import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaAngleRight } from 'react-icons/fa';
import style from '../styles/AllProducts.module.css';
import Categories from './Categories';
import CategoriesHeader from './CategoriesHeader';
import ProductHeader from './ProductHeader';
import Product from './Product';

const AllProducts = () => {
  return (
    <>
      <CategoriesHeader />
  
      <Categories />

      <ProductHeader />

      <div className={style.row}>
        <Product />
      </div>
      <div className={style.row}>
        <Product />
      </div>
    </>
  )
}

export default AllProducts