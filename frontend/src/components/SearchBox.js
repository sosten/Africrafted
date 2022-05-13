import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FiSearch from 'react-icons/fi';

const SearchBox = () => {

    const navigate = useNavigate()
    const [query, setQuery] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    }

  return (
    <div>
        <form onSubmit={submitHandler}>
            <label htmlFor="q"></label>
            <input type="text" name='q' id='q' onChange={(e)=>setQuery(e.target.value)} placeholder='Search products'
                aria-label='Search products'
                aria-describedby='button-search'
            />
            <button type='submit' id='button-search'>
                <FiSearch />
            </button>
        </form>
    </div>
  )
}

export default SearchBox;