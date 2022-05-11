import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import afri_logo from '../assets/images/afri_logo.png';
import { Store } from '../Store';
import style from '../styles/navbar.module.css';

const Navbar = () => {

  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state;

  const handleSignOut = () => {
    ctxDispatch({type: 'USER_SIGINOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }

  return (
    <div className={style.navbar_wrapper}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.afri_logo}>
            <Link to={'/'}><img src={afri_logo} alt="Africraft" className={style.img} /></Link>
          </div>
          <div className={style.form_container}> 
            <form>
              <label htmlFor="search"></label>
              <input type="text" placeholder='Search for anything' id='search' />
            </form>
            <div className={style.svg_search_icon_container}>
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 487.95 487.95" className={style.svg_search_icon}>
                <g>
                  <g>
                    <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
                      c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
                      c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"/>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className={style.sign_in}>
            {userInfo ? (
              <div>
                Hi, {userInfo.firstName}
                <ul>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/order_history">Order History</Link></li>
                  <li onClick={handleSignOut}><Link to="#">Sign Out</Link></li>
                </ul>
              </div>):(
              <Link to={'/login'}>Sign in</Link>
            )}
            
          </div>
          <div className={style.svg_heart_icon_container}>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 217.408 217.408"  className={style.svg_heart_icon}>
              <path d="M194.078,22.682c-10.747-8.193-22.606-12.348-35.248-12.348c-15.951,0-33.181,6.808-50.126,19.754
              C91.759,17.142,74.529,10.334,58.578,10.334c-12.642,0-24.501,4.155-35.248,12.348C7.606,34.671-0.24,49.8,0.006,67.648
              c0.846,61.117,100.093,133.233,104.317,136.273l4.381,3.153l4.381-3.153c4.225-3.04,103.472-75.156,104.317-136.273
              C217.648,49.8,209.802,34.671,194.078,22.682z M153.833,149.017c-18.374,18.48-36.915,33.188-45.129,39.453
              c-8.214-6.265-26.755-20.972-45.129-39.453c-31.479-31.661-48.274-59.873-48.57-81.585c-0.178-13.013,5.521-23.749,17.421-32.822
              c8.073-6.156,16.872-9.277,26.152-9.277c17.563,0,34.338,10.936,45.317,20.11l4.809,4.018l4.809-4.018
              c10.979-9.174,27.754-20.11,45.317-20.11c9.28,0,18.079,3.121,26.152,9.277c11.9,9.073,17.599,19.809,17.421,32.822
              C202.107,89.145,185.311,117.356,153.833,149.017z"/>
            </svg>
          </div>
          <div className={style.svg_shopping_cart_icon_container}>
            <Link to='/shopping_cart'>
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 260.293 260.293" className={style.svg_shopping_cart_icon}>
                  <g>
                    <path d="M258.727,57.459c-1.42-1.837-3.612-2.913-5.934-2.913H62.004l-8.333-32.055c-0.859-3.306-3.843-5.613-7.259-5.613H7.5
                      c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h33.112l8.333,32.055c0,0.001,0,0.001,0.001,0.002l29.381,112.969
                      c0.859,3.305,3.843,5.612,7.258,5.612h137.822c3.415,0,6.399-2.307,7.258-5.612l29.385-112.971
                      C260.636,61.687,260.147,59.295,258.727,57.459z M117.877,167.517H91.385l-5.892-22.652h32.384V167.517z M117.877,129.864H81.592
                      l-5.895-22.667h42.18V129.864z M117.877,92.197H71.795l-5.891-22.651h51.973V92.197z M176.119,167.517h-43.242v-22.652h43.242
                      V167.517z M176.119,129.864h-43.242v-22.667h43.242V129.864z M176.119,92.197h-43.242V69.546h43.242V92.197z M217.609,167.517
                      h-26.49v-22.652h32.382L217.609,167.517z M227.403,129.864h-36.284v-22.667h42.18L227.403,129.864z M237.201,92.197h-46.081V69.546
                      h51.974L237.201,92.197z"/>
                    <path d="M105.482,188.62c-15.106,0-27.396,12.29-27.396,27.395c0,15.108,12.29,27.4,27.396,27.4
                      c15.105,0,27.395-12.292,27.395-27.4C132.877,200.91,120.588,188.62,105.482,188.62z M105.482,228.415
                      c-6.835,0-12.396-5.563-12.396-12.4c0-6.835,5.561-12.395,12.396-12.395c6.834,0,12.395,5.561,12.395,12.395
                      C117.877,222.853,112.317,228.415,105.482,228.415z"/>
                    <path d="M203.512,188.62c-15.104,0-27.392,12.29-27.392,27.395c0,15.108,12.288,27.4,27.392,27.4
                      c15.107,0,27.396-12.292,27.396-27.4C230.908,200.91,218.618,188.62,203.512,188.62z M203.512,228.415
                      c-6.833,0-12.392-5.563-12.392-12.4c0-6.835,5.559-12.395,12.392-12.395c6.836,0,12.396,5.561,12.396,12.395
                      C215.908,222.853,210.347,228.415,203.512,228.415z"/>
                    </g>
                  </svg>
                  {cart.cartItems.length > 0 && (
                    <span>{cart.cartItems.reduce((a, c)=> a + c.quantity, 0)}</span>
                  )}
              </Link>
            </div>
          </div>
          <div className={style.categories_navbar}>
            <Link to={'#'}>Jewerly & Accessories</Link>
            <Link to={'#'}>Clothing & Shoes</Link>
            <Link to={'#'}>Home & Living</Link>
            <Link to={'#'}>Wedding & Party</Link>
            <Link to={'#'}>Toys & Entertainment</Link>
            <Link to={'#'}>Art & Collectibles</Link>
            <Link to={'#'}>Craft Supplies & Tools</Link>
            <Link to={'#'}>Vintage</Link>
          </div>
        </div>
    </div>
  )
}

export default Navbar