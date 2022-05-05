import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const PlaceOrderScreen = () => {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state;


  return (
    <div>
      <div style={{textAlign:"center"}}><h1>Order Summary</h1></div>
      <div>
        <h2>Shipping Address</h2>
        <div>
          <p><b>Address:</b> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.country}</p>
          <Link to="/shipping">Edit</Link>
          <hr />
        </div>
        <h2>Payment Method</h2>
        <div>
          <p>{cart.paymentMethod}</p>
          <Link to="/payment">Edit</Link>
          <hr />
        </div>
        <div>
          <h2>Item</h2>
          <div>
            {cart.cartItems.map((item)=>(
              <div key={item.id}>
                <p><img src={item.image} alt={item.productName} /></p>pr
                <p>name: {item.productName}</p>
                <p>Qty: {item.quantity}</p>
                <p>price: {item.price}</p>
                <Link to={`/product/${item.slug}`}>Edit</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen