import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Shipping.module.css';
import decor from '../assets/images/decor_1.webp';

const Shipping = () => {
  return (
    <div className={style.container}>
        <div className={style.form_container}>
            <form>
                <div className={style.header}>
                    <h1>Shipping Details</h1>
                </div>
                <label htmlFor="country">Country</label>
                <input type="text" placeholder='Zambia' id='Country' />
                <label htmlFor="fullname">Full Name</label>
                <input type="text" placeholder='John Doe' id='fullname' />
                <label htmlFor="address_1">Address 1</label>
                <input type="text" placeholder='1234 Copper Street, 2345' />
                <p style={{color:'#989898'}}>street Address, Home Number, POBox</p>
                <div className={style.additional_info}>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" placeholder='Lusaka' id='city' />
                    </div>
                    <div>
                        <label htmlFor="state">State/Province</label>
                        <input type="text" placeholder='Lusaka' id='state' />
                    </div>
                </div>
                <div className={style.additional_info}>
                    <div>
                        <label htmlFor="zip">Zip Code</label>
                        <input type="number" placeholder='101010' id='zip' />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone Number (Optional)</label>
                        <input type="number" placeholder='+260 7777 30003' id='phone' />
                    </div>
                </div>
                <input type="submit" value={'Continue'} />
            </form>
            <div className={style.order_summary}>
                <div className={style.order_summary_header}>
                    <h2>Order Summary</h2>
                    <Link to="/shopping_cart">Edit Cart</Link>
                </div>
                <div className={style.order_summary_cont}>
                    <div className={style.order_summary_cart}>
                        <div className={style.cart_img}>
                            <img src={decor} alt="Product Name" />
                        </div>
                        <div className={style.cart_cont}>
                            <p className={style.product_name}>Wall Decor</p>
                            <p className={style.price}>K4536.00</p>
                            <p className={style.qty}>Quantity: 1</p>
                        </div>
                    </div>
                    <div className={style.sub_total_container}>
                        <div className={style.sub_total}>
                            <p>Subtotal</p>
                            <p className={style.sub_total_price}>K4536.00</p>
                        </div>
                        <div className={style.sub_total}>
                            <p>Shipping</p>
                            <p className={style.sub_total_price}>K0</p>
                        </div>
                        <div className={style.sub_total}>
                            <p>Tax</p>
                            <p className={style.sub_total_price}>K4.00</p>
                        </div>
                        <div className={style.total}>
                            <p>Total</p>
                            <p className={style.total_price}>K4540.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Shipping