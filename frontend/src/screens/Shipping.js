import React from 'react';
import Navbar from '../components/Navbar';
import style from '../styles/ShippingPage.module.css';

const Shipping = () => {
  return (
    <div>
        <Navbar />
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.header_cont}>
                    <h1>Shipping</h1>
                    <p>Shipping (from Zambia)</p>
                </div>
            </div>
            <div>
                <p></p>
            </div>
        </div>
    </div>
  )
}

export default Shipping