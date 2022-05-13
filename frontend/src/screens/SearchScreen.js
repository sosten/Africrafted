import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {
                ...state, 
                loading: false, 
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts
            }
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
    
        default:
            return state;
    }
}

const prices = [
    {
        name: '$1 to $50',
        value: '1-50'
    },
    {
        name: '$51 to $200',
        value: '51-200'
    },
    {
        name: '$201 to $1000',
        value: '201-1000'
    }
];

export const ratings = [
    {
        name: '4stars & up',
        rating: '4'
    },
    {
        name: '3stars & up',
        rating: '3'
    },
    {
        name: '2stars & up',
        rating: '2'
    },
    {
        name: '1stars & up',
        rating: '1'
    }
]

const SearchScreen = () => {
    const navigation = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search); //search?category=beads
    const category = sp.get('category') || 'all';
    const query  = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    const [{loading, error, products, countProducts, pages}, dispatch] = useReducer(reducer, 
        {
            error: '',
            loading: true
        });

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                 const { data } = axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}$price=${price}&rating=${rating}&order=${order}`
                    );
                dispatch({type: 'FETCH_REQUEST', payload: data})   
            } catch (error) {
                dispatch({type: 'FETCH_FAIL', payload: error})
            }
        }
        fetchData();
    }, [error, page, query, category, price, rating, order]);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('/api/products/categories');
                setCategories(data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories();

    }, [dispatch]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.page || page;
        const filterQuery = filter.query || query;
        const filterPrice = filter.price || price;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`
    }

  return (
    <div>
        <div>
            <h1>Search products</h1>
        </div>
        <div>
            <h3>Department</h3>
            <ul>
                <li><Link to={getFilterUrl({category: 'all'})}>Any</Link></li>
                {categories.map((c) => (
                    <li key={c}><Link to={getFilterUrl({category: c})}>{c}</Link></li>
                ))}
                
            </ul>
        </div>
        <div>
            <h3>Price</h3>
            <ul>
                <li><Link to={getFilterUrl({price: 'all'})}>Any</Link></li>
                {prices.map((p) => (
                    <li key={p.value}><Link to={getFilterUrl({price: p.value})}>{p.name}</Link></li>
                ))}
            </ul>
        </div>
        <div>
            <h3>Avarage Customer Reviews</h3>
            <div>
                <ul>
                    {ratings.map((r) => (
                        <li key={r.name}>
                            <Link to={getFilterUrl({rating: r.rating})}>
                                <Rating caption = {' & up'} rating = {r.rating}></Rating>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link to={getFilterUrl({rating: 'all'})}>
                            <Rating caption={' & up'} rating = {0}></Rating>
                        </Link>
                    </li>
                </ul>
                
            </div>
        </div>
    </div>
  )
}

export default SearchScreen