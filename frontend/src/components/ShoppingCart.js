import React from "react";
import { Link } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import { AiFillTag } from "react-icons/ai";
import { RiCopyrightLine } from "react-icons/ri";
import style from "../styles/ShoppingCart.module.css";
import artist from "../assets/images/img.jfif";
import decor from "../assets/images/decor_1.webp";
import airtel from "../assets/images/airtel-mobile-money.png";
import mtn from "../assets/images/mtn.png";
import mastercard from "../assets/images/mastercard.png";
import visa from "../assets/images/Visa-Logo.png";
import paypal from "../assets/images/paypal.png";

const ShoppingCart = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <h1>1 item in your cart</h1>
        </div>
        <div className={style.decision}>
          <Link to="/all_products">Keep Shopping</Link>
        </div>
        <div className={style.product_container}>
          <div className={style.product_details}>
            <div className={style.art_and_artist}>
              <div className={style.artist}>
                <img src={artist} alt="Artist" />
                <p>ArtonlineGallery</p>
              </div>
              <div className={style.img_container}>
                <img src={decor} alt="Art" />
              </div>
            </div>
            <div className={style.description_container}>
              <div className={style.description}>
                <p>
                  Portrait painting custom from photo hand painted oil paints
                  canvas child family portrait wedding commission painting
                </p>
                <span>Size: 10 x 14 in / 25 x 35 cm</span>
                <div className={style.remove_or_save}>
                  <p>Remove</p>
                  <p>Save for later</p>
                </div>
              </div>
              <div className={style.qty_amount}>
                <span>Qty:</span>
                <button>
                  <div>1</div> <GoTriangleDown />
                </button>
                <p className={style.price}>K3452.99</p>
              </div>
            </div>
          </div>
          <div className={style.product_subtotal}>
            <div className={style.subtotal_header}>
              <h2>How you'll pay</h2>
            </div>
            <div className={style.payment_methods}>
              <img src={airtel} alt="Airtel Mobile Money" />
              <img src={mtn} alt="MTN Mobile Money" />
              <img src={visa} alt="Visa card" />
              <img src={mastercard} alt="Visa card" />
              <img src={paypal} alt="Paypal" />
            </div>
            <div className={style.row}>
              <p>Item(s) total</p>
              <p>K3452.99</p>
            </div>
            <div className={style.row}>
              <p>Shipping</p>
              <p>K10.00</p>
            </div>
            <div className={style.row_total}>
              <p>Total(1 item)</p>
              <p>K3453.99</p>
            </div>
            <div className={style.checkout_section}>
              <button>Proceed to checkout</button>
              <div className={style.checkout_cont}>
                <p className={style.coupon}>
                  {" "}
                  <AiFillTag color="#ee7e22" /> Apply Africraft coupon code
                </p>
                <p className={style.tax}>
                  Local Taxes included (where applicable)
                </p>
                <p className={style.dute}>
                  * Additional duties and taxes may apply
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.footer_navbar}>
          <div className={style.left_links}>
            <p>Zambia | English</p>
          </div>
          <div className={style.right_links}>
            <p>
              <RiCopyrightLine size={12} />
              <span>2022</span>
            </p>
            <Link to={"#"}>Africrafted</Link>
            <Link to={"#"}>Terms Of Use</Link>
            <Link to={"#"}>Privacy Policy</Link>
            <Link to={"#"}>Help Center</Link>
          </div>
        </div>
        <div className={style.teams_of_use}>
          <p>
            Merchant is Africrafted, Inc. (Zambia) depending on the currency in
            which the Seller transacts. See Africrafted Payments Terms of Use.
          </p>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
