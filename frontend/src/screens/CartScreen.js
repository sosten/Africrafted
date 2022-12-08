import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { AiFillTag, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiCopyrightLine } from "react-icons/ri";
import style from "../styles/CartScreen.module.css";
// import artist from "../assets/images/img.jfif";
import airtel from "../assets/images/airtel-mobile-money.png";
import mtn from "../assets/images/mtn.png";
import mastercard from "../assets/images/mastercard.png";
import visa from "../assets/images/Visa-Logo.png";
import paypal from "../assets/images/paypal.png";
import { Store } from "../Store";

const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry: this product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeCartItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Navbar />
      <div className={style.container}>
        {cartItems.length === 0 ? (
          <div className={style.header}>
            <div className={style.header_cont}>
              <h1>OOps !</h1>
              <h2>Your cart is empty</h2>
              <Link to={"/search?category=all&query=all&price=all&rating=all&order=newest&page=1"}>Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className={style.test_flex}>
            <div className={style.header}>
              <h1>{cartItems.length} item(s) in your cart</h1>
            </div>
            <div className={style.decision}>
              <Link to="/search?category=all&query=all&price=all&rating=all&order=newest&page=1">Keep Shopping</Link>
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
                  <p>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    item)
                  </p>
                  <p>
                    ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </p>
                </div>
                {/* <div className={style.row}>
                      <p>Shipping</p>
                      <p>K10.00</p>
                    </div>
                    <div className={style.row_total}>
                      <p>Total(1 item)</p>
                      <p>K3453.99</p>
                    </div> */}
                <div className={style.checkout_section}>
                  <button
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </button>
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
            {cartItems.map((item) => (
              <div key={item._id}>
                <div className={style.product_container}>
                  <div className={style.product_details}>
                    <div className={style.art_and_artist}>
                      <div className={style.artist}>
                        {/* <img src={artist} alt="Artist" /> */}
                        <p><b>Artist:</b> {item.artistName}</p>
                      </div>
                      <div className={style.img_container}>
                        <img src={item.image} alt={item.productName} />
                      </div>
                    </div>
                    <div className={style.description_container}>
                      <div className={style.description}>
                        <p>{item.description}</p>
                        <span>Size: 10 x 14 in / 25 x 35 cm</span>
                        <div className={style.remove_or_save}>
                          <button onClick={() => removeCartItemHandler(item)}>
                            Remove
                          </button>
                          {/* <p>Save for later</p> */}
                        </div>
                      </div>
                      <div className={style.qty_amount}>
                        <span>Qty:</span>
                        <button
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                        >
                          <AiOutlineMinus size={16} color={"#000"} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          disabled={item.quantity === item.countInStock}
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                        >
                          <AiOutlinePlus size={16} color={"#000"} />
                        </button>
                        <p className={style.price}>${item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default CartScreen;
