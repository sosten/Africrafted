import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import style from "../styles/ShippingPage.module.css";

const Shipping = () => {
  return (
    <div>
      <Navbar />
      <div className={style.header}>
        <div className={style.header_color}>
          <div className={style.header_cont}>
            <h1>Return & Shipping</h1>
            <p>from Zambia</p>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.shipping}>
          <h2>Shipping</h2>
          <p>
            Shipping on our website is automatically calculated when you click
            add to cart button. The shipping price will automatically show up
            for your destination and you can then decide to carry on with the
            order or abandon the order. Shipping prices are given below and are
            based on a weight system. Some items on our website have free
            shipping and will be sated next to the item description
          </p>
          <p>
            In regard to shipping due to the nature of the goods( all being hand
            crafted ) the time taken to deliver items to your address can take
            up to 3 weeks but in most cases goods will be received within 14
            days. It all depends on the product purchased. We aim to have items
            packed and send out within 1-3 days of an order being placed and
            then the delivery guys time will depend on location but in most
            cases the above shipping times will apply.
          </p>
        </div>
        <div className={style.return}>
          <h2>Return Policy</h2>
          <p>Our Return Policy is very simple and flexible:</p>
          <p>
            If you are not happy with a purchase, for any reason, you can return
            it to us within 30 days of order date. As soon as it arrives, we'll
            issue a full refund for the entire purchase price.
          </p>
          <p>
            Please note: We do not reimburse the outgoing or return shipping
            charges unless the return is due to a defect in quality.
          </p>
          <p>
            If you need to purchase artwork online, why not give us a try? We
            are here for you.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shipping;
