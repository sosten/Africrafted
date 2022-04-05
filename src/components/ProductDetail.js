import React from 'react';
import style from '../styles/ProductDetail.module.css';
import decor_1 from '../assets/images/decor_1.webp';
import { AiFillStar } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import Product from '../components/Product';

const ProductDetail = () => {
  return (
    <div className={style.container}>
        <div className={style.product_wrapper}>
            <div className={style.img_cover}>
                <img src={decor_1} alt="Product Details" />
            </div>
            <div className={style.heart}>
                <BsHeart size={24} />
            </div>
            <div className={style.product_description}>
                <div className={style.artist}>            
                    <h2>ArtonlineGallery</h2>
                    <p>969 | sales <AiFillStar color='#444' /> <AiFillStar color='#444' /> <AiFillStar color='#444' /> <AiFillStar color='#444' /> <AiFillStar color='#444' /> </p>
                </div>
                <p className={style.description}>Portrait painting custom from photo hand painted oil paints canvas child family portrait wedding commission painting</p>
                <p className={style.price}><b>K4527.99</b> <span><BsCheck2 /><small>In stock</small></span> </p>
                <p className={style.tax}>Local taxes included (where applicable)</p>
                <p className={style.size}>Size: 29” X 11” X 3”</p>
                <button>Add to Cart</button>
            </div>
        </div>
        <div className={style.row}>
            <div className={style.similar_header}>
                <h2>Similar products</h2>
            </div>  
            <Product />
        </div>
        
    </div>
  )
}

export default ProductDetail