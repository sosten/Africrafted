import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Order.module.css';
import { FaUser } from 'react-icons/fa'; 
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GrDeliver } from 'react-icons/gr';
import { FaCreditCard }  from 'react-icons/fa';
import decor from '../assets/images/decor_1.webp';
import paypal from '../assets/images/PayPal-Logo.png';

const PressOrder = () => {
  return (
    <div className={style.container}>
        <div className={style.header}>
            <div>
                <div className={style.customer}>
                    <div className={style.customer_icon}>
                        <FaUser />
                    </div>
                    <div className={style.customer_info}>
                        <p className={style.customer_header}>Customer</p>
                        <p>John Doe</p>
                        <p>johndoe@gmail.com</p>
                    </div>
                   
                </div>
            </div>
            <div>
                <div className={style.order}>
                    <div className={style.order_icon}>
                        <FaMapMarkerAlt />
                    </div>
                    <div className={style.order_info}>
                        <p className={style.order_header}>Order info</p>
                        <p>Shipping: Lusaka, Zambia</p>
                        <p>Payment method: PayPal</p>
                        <div>
                            <p className={style.status}>Not Paid</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className={style.delivery}>
                    <div className={style.delivery_icon}>
                        <GrDeliver />
                    </div>
                    <div className={style.delivery_info}>
                        <p className={style.delivery_header}>Deliver to</p>
                        <p>Address: kanyongoloka, lusaka</p>
                        <p>copper street lusaka</p>
                        <div>
                            <p className={style.status}>Not Delivered</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={style.press_order_container}>
            <div className={style.product_details}>
                <div className={style.product}>
                    <img src={decor} alt="Product name" />
                    <p>name of the product</p>
                </div>
                <div className={style.qty}>
                    <p className={style.qty_title}>Quantity</p>
                    <p className={style.number}>2</p>
                </div>
                <div className={style.sub_total}>
                    <p className={style.sub_total_title}>Sub Total</p>
                    <p className={style.number}>K2934</p>
                </div>
            </div>
            <div className={style.press_order}>
                <div className={style.press_order_cont}>
                    <p>Sub Total</p>
                    <p>K1433</p>
                </div>
                <div className={style.press_order_cont}>
                    <p>Shipping</p>
                    <p>K143</p>
                </div>
                <div className={style.press_order_cont}>
                    <p>Tax</p>
                    <p>K20</p>
                </div>
                <div className={style.press_order_cont}>
                    <p>Total</p>
                    <p>K143</p>
                </div>
                <hr />
                <div>
                    <Link to="#"><img src={paypal} alt="paypal button" /></Link>
                    <p className={style.card}><FaCreditCard /> <span>Debit or Credit Card</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PressOrder