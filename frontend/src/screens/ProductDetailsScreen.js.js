import style from '../styles/ProductDetail.module.css';
import decor_1 from '../assets/images/decor_1.webp';
import { AiFillStar } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
// import Product from '../components/Product';
// import data from '../data/data';
import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

const ProductDetailsScreen = () => {

    const reducer = async (state, action) => {
        switch(action.type){
            case 'FETCH_REQUEST':
                return {...state, loading: true}
            case 'FETCH_SUCCESS':
                return {...state, loading: false, error: false, product: action.payload}
            case 'FETCH_FAIL':
                return {...state, loading: false, error: action.payload}
            default:
                return state

        }
    }

    const[{loading, error, product}, dispatch] = useReducer(reducer, {
        loading: true, error: '', product: []
    });

    useEffect(()=>{
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST', loading: true})
            try{
                const result = await axios.get(`/api/product${id}`);
                dispatch({type: 'FETCH_SUCCESS', loading: false, payload: result.data})
            }
            
            catch(error){
                dispatch({type: 'FETCH_FAIL', loading: false, payload: error.message })
            }
        }

        fetchData()
    })

    const params = useParams();
    const {id} = params;
  
  return (
    <div className={style.container}>
        <div className={style.product_wrapper}>
            <h1>{id}</h1>
            <div className={style.img_cover}>
                <img src={decor_1} alt="wall" />
            </div>
            <div className={style.heart}>
                <BsHeart size={24} />
            </div>
            <div className={style.product_description}>
                <div className={style.artist}>            
                    <h2>Wall Decor</h2>
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
            {/* <Product /> */}
        </div>
        
    </div>
  )
}

export default ProductDetailsScreen