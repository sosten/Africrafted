import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import Rating from './Rating';
import style from '../styles/Product.module.css';
// import data from '../data/data';

const Product = (props) => {
    const { product } = props;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
      cart: { cartItems },
    } = state;
  
    const addToCartHandler = async(item) => {
    const existItem = cartItems.find((x)=>x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${item._id}`);
      if(data.countInStock < quantity){
        window.alert('Sorry: this product is out of stock');
        return;
      }
      ctxDispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity}});
    }
  return (
    <div className={style.container}>
        <div className={style.card_wrapper}>
            <Link to={`/product/${product.slug}`} title="Click to view details">
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
            {product.countInStock === 0 ? (<button disabled>Out of stock</button>) : (<button onClick={()=> addToCartHandler(product)}>Add to cart</button>)}
        </div>
    </div> 
  );
}

export default Product;