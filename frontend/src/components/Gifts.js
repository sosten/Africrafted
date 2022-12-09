import React from 'react';
import style from '../styles/gifts.module.css';
// import afri_logo from '../assets/images/bres_1.jpg';
// import fabric_1 from '../assets/images/fab_1.jpg';
// import wood_1 from '../assets/images/wood_1.webp';
// import bag_1 from '../assets/images/bag_1.webp';
// import jewelry_5 from '../assets/images/jewelry_5.jpg';
import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';
import { useReducer } from 'react';
// import logger from 'use-reducer-logger';
import { useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return { ...state, loading: false }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload }
        case 'FETCH_FAIL':
            return { ...state, error: action.payload }
        default:
            return state
    }
}

const Gifts = () => {
    const [ { loading, error, products }, dispatch ] = useReducer(reducer, {
        error: '',
        loading: false,
        products: []
    });

    useEffect(() => {
        const fetchData = async() => {
            dispatch({type: 'FETCH_REQUEST', loading: false})
            try {
                const result = await axios.get('/api/products/home')
                dispatch({type: 'FETCH_SUCCESS', loading: false, payload: result.data})
            } catch (error) {
                dispatch({type: 'FETCH_FAIL'})
                console.log(error);
            }
        }
        fetchData()
    }, []);

  return (
    <>
        <div className={style.container}>
            { 
                loading ? (<LoadingSpinner />) : error ? (<div>{error}</div>) : (
                    <div>
                        <div className={style.header}>
                            <h1>Most popular products</h1>
                            {/* <Link to='/home_screen'>View all</Link> */}
                            <Link to="/search?category=all&query=all&price=all&rating=all&order=newest&page=1">View all</Link>
                        </div>
                        {
                            <div className={style.card_container}>
                                {
                                    products.map((product) => (
                                    <div key = {product._id} className={style.card}>
                                        <Link to={`/product/${product.slug}`} title="Click to view details">
                                            <img src={product.image} alt="category" className={style.img} />
                                            <div className={style.card_details}>
                                                <p>{product.productName}</p>
                                                <p className={style.artist}><b>Artist</b>: {product.artistName}</p>
                                            </div>
                                        </Link>
                                        <div className={style.price}>
                                            <h3>${product.price}</h3>
                                            {/* <p><FaShoppingCart className={style.icon} title='Add to cart'/></p> */}
                                        </div>
                                    </div>
                                ))
                                }
                        </div>
                        }
                   </div> 
                )
            }
        </div>
    </>
  )
}

export default Gifts;