import React from 'react';
import Product from '../components/Product';
// import data from '../data/data';

const HomeScreen = () => {
  return (
    <div>
      {
        // data.product.map((product) => 
        //   (<Product key={product._id} product={product} />)
        <Product />
        // )
      }
    </div>
  )
}

export default HomeScreen