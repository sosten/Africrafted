import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import style from '../styles/Product.module.css';
// import data from '../data/data';

const Product = (props) => {
    const { product } = props;
  return (
    <div className={style.container}>
        <div className={style.card_wrapper}>
            <Link to={`/productId/${product._id}`}>
                <div className={style.card}>
                    <img src={product.image} alt={product.name} />
                    <div className={style.card_content}>
                        <p className={style.description}>{product.name}</p>
                        <p className={style.rating}>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                        </p>
                        <p>{product.productName}</p>
                        <p className={style.artist}><b>Artist:</b> {product.artistName}</p>
                        <p className={style.price}><b>${product.price}</b></p>
                    </div>
                </div>
            </Link>
        </div>
    </div> 
  )
}

export default Product