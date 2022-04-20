import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Product.module.css';
import { AiFillStar }  from 'react-icons/ai';
// import decor from '../assets/images/decor_1.webp';
import data from '../data/data';

const Product = () => {
    // const { product } = props;
  return (
    <>
        <div className={style.container}>
            {data.product.map((product)=> (
            <div key={product._id} className={style.card_wrapper}>
                <Link to={`/product/${product._id}`}>
                    <div className={style.card}>
                        <img src={product.image} alt={product.name} />
                        <div className={style.card_content}>
                            <p className={style.description}>{product.name}</p>
                            <p className={style.rating}>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <AiFillStar color='#333'/>
                                <span>(1,234)</span>
                            </p>
                            <p className={style.price}>{product.price}</p>
                            <p className={style.artist}>{product.artist_name}</p>
                        </div>
                    </div>
                </Link>
            </div>
            ))
        }
        </div> 
    </>
  )
}

export default Product