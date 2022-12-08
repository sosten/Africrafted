import React from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { BsPinterest } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import payment from "../assets/images/payment-icon_1.png";
import style from "../styles/Footer.module.css";
const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.link_container}>
        <div className={style.links}>
          <h4>NAVIGATE</h4>
          <Link to={"/about"}>About Us</Link>
          <Link to={"/shipping_return"}>Shipping & Returns</Link>
          <Link to={"/contact"}>Contact Us</Link>
        </div>
        <div className={style.links}>
          <h4>SHOP</h4>
          <Link  to="/search?category=all&query=all&price=all&rating=all&order=newest&page=1">All Products</Link>
          <Link to={"/search?category=Beads"}>Beads</Link>
          <Link to={"/search?category=Jewerly"}>Jewelry</Link>
          <Link to={"/search?category=Masks"}>Masks</Link>
        </div>
        <div className={style.links}>
          <h4>INFO</h4>
          <Link to={"#"}>Africrafted</Link>
          <Link to={"#"}>P.O.BOX 1234</Link>
          <Link to={"#"}>Lusaka, Zambia</Link>
          <Link to={"#"}>
            <b>Call Us +260 777730003</b>
          </Link>
        </div>
        <div className={style.links_icons}>
          <h4>CONNECT WITH US</h4>
          <Link to={"#"}>
            <AiFillFacebook className={style.f_icon} />
          </Link>
          <Link to={"#"}>
            <FaTwitter className={style.t_icon} />
          </Link>
          <Link to={"#"}>
            <BsPinterest className={style.p_icon} />
          </Link>
          <Link to={"#"}>
            <BsInstagram className={style.i_icon} />
          </Link>
          <Link to={"#"}>
            <BsYoutube className={style.y_icon} />
          </Link>
        </div>
        <div className={style.links_form}>
          <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
          <p>Get the latest updates on new products and upcoming sales</p>
          <form>
            <label htmlFor="email"></label>
            <input type="text" placeholder="Your email address" id="email" />
            <input type="submit" value={"Subscribe"} />
          </form>
        </div>
      </div>

      <div className={style.copyright_container}>
        <div>
          <p>{"\u00a9"}2022 Africrafted</p>
        </div>
        <div>
          <Link to={"#"}>Terms Of Use</Link>
          <Link to={"#"}>Privacy Policy</Link>
        </div>
        <div className={style.payment_logo}>
          <img src={payment} alt="payment methods" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
